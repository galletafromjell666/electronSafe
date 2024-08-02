import { shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

class MainWindow {
    Window: BrowserWindow
    constructor() {
        // TODO:FIX
        // @ts-expect-error this should always be a BrowserWindow
        this.Window = null
    }

    async createWindow(): Promise<void> {
        // Create the browser window.
        this.Window = new BrowserWindow({
            useContentSize: true,
            width: 900,
            minWidth: 400,
            height: 595,
            minHeight: 595,
            show: false,
            autoHideMenuBar: true,
            ...(process.platform === 'linux' ? {} : {}),
            webPreferences: {
                preload: join(__dirname, '../preload/index.mjs'),
                sandbox: false,
            },
        })

        this.Window.on('ready-to-show', () => {
            this.Window!.show()
            // mainWindow.webContents.openDevTools({ mode: 'detach' })
        })

        this.Window.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url)
            return { action: 'deny' }
        })

        // HMR for renderer base on electron-vite cli.
        // Load the remote URL for development or the local html file for production.
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            this.Window.loadURL(process.env['ELECTRON_RENDERER_URL'])
        } else {
            this.Window.loadFile(join(__dirname, '../renderer/index.html'))
        }
    }
}

export default new MainWindow()
