import pty from 'node-pty'
import { ipcMain, Notification } from 'electron'
import SharedStore from './store'
import MainWindow from './mainWindow'

class Vc {
    mainProgramPath: string
    formatProgramPath: string
    ptyProcess: pty.IPty | null

    constructor() {
        this.mainProgramPath = ''
        this.formatProgramPath = ''
        this.ptyProcess = null
    }

    async init(): Promise<void> {
        // initialize  class properties
        const mainProgramPath = SharedStore.get('mainProgramLocation') as string
        const formatProgramPath = mainProgramPath.replace(
            /\.exe$/,
            ' Format.exe'
        )

        this.mainProgramPath = mainProgramPath
        this.formatProgramPath = formatProgramPath

        // Initialize other things
        this._initHandlers()
        this._initPtyProcess()
        this._initPtyOnDataListener()
    }

    runCommandoOnPty(command: string): void {
        this.ptyProcess!.write(command + '\r')
    }

    _initPtyProcess(): void {
        const isWindows = process.platform === 'win32'

        const shell = isWindows ? 'powershell.exe' : 'bash'

        this.ptyProcess = pty.spawn(shell, [], {
            name: 'asuka',
            cols: 80,
            rows: 30,
            cwd: process.cwd(),
            env: process.env,
        })
    }

    _initPtyOnDataListener(): void {
        let buffer = ''
        this.ptyProcess!.onData((data) => {
            buffer += data // Append incoming data to the buffer
            // TODO: Support other OS
            // Split buffer by the Windows line ending \x0D\x0A
            const lines = buffer.split('\x0D\x0A')
            // Process each complete line (all but the last element of the split array)
            for (let i = 0; i < lines.length - 1; i++) {
                const line = lines[i]
                if (line.includes('MOUNT_A') && !line.includes('ExitCode')) {
                    this._handleMountCommandResponse(line)
                }
                if (line.includes('UN_MOUNT_E') && !line.includes('ExitCode')) {
                    this._handleUnMountCommandResponse(line)
                }
                if (line.includes('CREATE_A') && !line.includes('ExitCode')) {
                    this._handleCreateCommandResponse(line)
                }
            }
            buffer = lines[lines.length - 1]
        })
    }

    _sendMountCommandToPty(data): void {
        // TODO: support more letters xd
        const mountLetter = 'G'
        const mountCommand = `$process = Start-Process -FilePath "${this.mainProgramPath}" -ArgumentList '/q','/v ${data.path}','/l ${mountLetter}','/silent','/p ${data.password}' -PassThru -Wait; Write-Host "MOUNT_A*"$process.ExitCode*"${data.path}*${mountLetter}"`
        this.runCommandoOnPty(mountCommand)
    }

    _handleMountCommandResponse(response: string): void {
        const dataArr = response.split('*')
        const status = dataArr[1].trim()
        const containerPath = dataArr[2]?.trim()
        const driveLetter = dataArr[3]?.trim()
        if (status.includes('1')) return // FAIL
        MainWindow.Window.webContents.send('mount_command_completed', {
            containerPath,
            driveLetter,
        })
    }

    _sendUnMountCommandToPty(data): void {
        const { mountLetter } = data
        const unMountCommand = `$process = Start-Process -FilePath "${this.mainProgramPath}" -ArgumentList '/q','/silent','/d ${mountLetter}' -PassThru -Wait; Write-Host "UN_MOUNT_E*"$process.ExitCode*"${mountLetter}"`
        this.runCommandoOnPty(unMountCommand)
    }

    _handleUnMountCommandResponse(response: string): void {
        const dataArr = response.split('*')
        const status = dataArr[1].trim()
        const driveLetter = dataArr[2]?.trim()
        if (status.includes('1')) return // FAIL
        MainWindow.Window.webContents.send('unmount_command_completed', {
            driveLetter,
        })
    }

    _sendCreateCommandToPty(data): void {
        const createCommand = `$process = Start-Process -FilePath "${this.formatProgramPath}" -ArgumentList '/create ${data.path}','/silent','/pim 0','/size ${data.size}M','/hash ${data.hash}', '/password ${data.password}','/encryption ${data.encryption}','/filesystem ${data.fileSystem}' -PassThru -Wait; Write-Host "CREATE_A*"$process.ExitCode*${data.path}`
        this.runCommandoOnPty(createCommand)
    }

    _handleCreateCommandResponse(response: string): void {
        const dataArr = response.split('*')
        const status = dataArr[1].trim()
        const containerPath = dataArr[2]?.trim()
        if (status.includes('1')) return // FAIL
        new Notification({
            title: 'Encrypted container created',
            body: `You can now mount your container ${containerPath}`,
        }).show()
        MainWindow.Window.webContents.send('create_container_completed', {
            containerPath,
        })
    }

    _initHandlers(): void {
        ipcMain.on('create_container', async (_event, data) => {
            this._sendCreateCommandToPty(data)
        })

        ipcMain.on('container_mount', async (_event, data) => {
            this._sendMountCommandToPty(data)
        })

        ipcMain.on('container_unmount', async (_event, data) => {
            this._sendUnMountCommandToPty(data)
        })
    }
}

export default new Vc()
