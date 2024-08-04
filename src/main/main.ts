import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import MainWindow from './mainWindow'
import * as diskUsage from 'diskusage'
import * as driveList from 'drivelist'
import SharedStore from './store'
import Vc from './vc'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', async () => {
    await SharedStore.init()
    await Vc.init()
})

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
        const isWindows = process.platform === 'win32'
        const [drive] = path.split(isWindows ? '\\' : '/')
        const volumeStats = await diskUsage.check(drive)
        return volumeStats
    })

    // DOES NOT RETURN THE MOUNTED DRIVES :(
    ipcMain.handle('get_available_volumes', async () => {
        return await driveList.list()
    })

    ipcMain.on('frameEvent', (_, action) => {
        if (action === 'close') {
            MainWindow.Window.close()
        }
        if (action === 'minimize') {
            MainWindow.Window.minimize()
        }
        if (action === 'maximize') {
            MainWindow.Window.isMaximized()
                ? MainWindow.Window.restore()
                : MainWindow.Window.maximize()
        }
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
