import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import pty from 'node-pty'
import * as diskUsage from 'diskusage'
import * as driveList from 'drivelist'
import MainWindow from './mainWindow'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
    MainWindow.createWindow()
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    // IPC test
    ipcMain.on('ping', () => console.log('pong'))
    // VC stuff

    // TODO: Make a setting page for this
    const formatExecutableLocation =
        'C:\\Program Files\\VeraCrypt\\VeraCrypt Format.exe'

    const normalExecutableLocation =
        'C:\\Program Files\\VeraCrypt\\VeraCrypt.exe'
    const isWindows = process.platform === 'win32'

    const shell = isWindows ? 'powershell.exe' : 'bash'

    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.cwd(),
        env: process.env,
    })

    let buffer = ''

    ptyProcess.onData((data) => {
        buffer += data // Append incoming data to the buffer
        // TODO: Support other OS
        // Split buffer by the Windows line ending \x0D\x0A
        const lines = buffer.split('\x0D\x0A')
        // Process each complete line (all but the last element of the split array)
        for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i]
            if (line.includes('MOUNT_A') && !line.includes('-Wait')) {
                const dataArr = line.split('*')
                const status = dataArr[1].trim()
                const containerPath = dataArr[2]?.trim()
                const driveLetter = dataArr[3]?.trim()
                if (status.includes('1')) return // FAIL
                MainWindow.Window.webContents.send('MOUNT_COMMAND_COMPLETED', {
                    containerPath,
                    driveLetter,
                })
            }
            if (line.includes('UN_MOUNT_E') && !line.includes('-Wait')) {
                const dataArr = line.split('*')
                const status = dataArr[1].trim()
                const driveLetter = dataArr[2]?.trim()
                if (status.includes('1')) return // FAIL
                MainWindow.Window.webContents.send(
                    'UN_MOUNT_COMMAND_COMPLETED',
                    {
                        driveLetter,
                    }
                )
            }
            if (line.includes('CREATE_A') && !line.includes('-Wait')) {
                const dataArr = line.split('*')
                const status = dataArr[1].trim()
                const containerPath = dataArr[2]?.trim()
                if (status.includes('1')) return // FAIL
                MainWindow.Window.webContents.send('CREATE_COMPLETED', {
                    containerPath,
                })
            }
        }
        buffer = lines[lines.length - 1]
    })

    const runCommandoOnPty = (command: string): void =>
        ptyProcess.write(command + '\r')

    ipcMain.handle('create_container', async (_event, data) => {
        const createCommand = `$process = Start-Process -FilePath "${formatExecutableLocation}" -ArgumentList '/create ${data.path}','/silent','/pim 0','/size ${data.size}M','/hash ${data.hash}', '/password ${data.password}','/encryption ${data.encryption}','/filesystem ${data.fileSystem}' -PassThru -Wait; Write-Host "CREATE_A*"$process.ExitCode*${data.path}`
        runCommandoOnPty(createCommand)
    })

    ipcMain.handle('container_mount', async (_event, data) => {
        const mountLetter = 'G'
        const mountCommand = `$process = Start-Process -FilePath "${normalExecutableLocation}" -ArgumentList '/q','/v ${data.path}','/l ${mountLetter}','/silent','/p ${data.password}' -PassThru -Wait; Write-Host "MOUNT_A*"$process.ExitCode*"${data.path}*${mountLetter}"`
        runCommandoOnPty(mountCommand)
    })

    ipcMain.handle('container_unmount', async (_event, data) => {
        const { mountLetter } = data
        const unMountCommand = `$process = Start-Process -FilePath "${normalExecutableLocation}" -ArgumentList '/q','/silent','/d ${mountLetter}' -PassThru -Wait; Write-Host "UN_MOUNT_E*"$process.ExitCode*"${mountLetter}"`
        runCommandoOnPty(unMountCommand)
    })

    ipcMain.on('show_native_open_dialog', (event, options) => {
        event.returnValue = dialog.showOpenDialogSync(
            BrowserWindow.getFocusedWindow()!,
            options
        )
    })

    ipcMain.on('show_native_save_dialog', (event, options) => {
        event.returnValue = dialog.showSaveDialogSync(
            BrowserWindow.getFocusedWindow()!,
            options
        )
    })

    ipcMain.handle('get_volume_details', async (_event, path: string) => {
        // TODO: Support other OS besides Windows
        const [drive] = path.split(isWindows ? '\\' : '/')
        const volumeStats = await diskUsage.check(drive)
        return volumeStats
    })

    // DOES NOT RETURN THE MOUNTED DRIVES :(
    ipcMain.handle('get_available_volumes', async () => {
        return await driveList.list()
    })

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0)
            MainWindow.createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
