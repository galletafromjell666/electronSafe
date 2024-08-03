import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { type DiskUsage } from 'diskusage'
import { type Drive } from 'drivelist'

// Custom APIs for renderer
const sendPingToMainProcess = (): void => ipcRenderer.send('ping')

const createEncryptedContainer = async (data: {
    path: string
    password: string
}): Promise<string> => ipcRenderer.invoke('create_container', data)

const mountEncryptedContainer = async (data: {
    path: string
    password: string
}): Promise<string> => ipcRenderer.invoke('container_mount', data)

const unMountEncryptedContainer = async (data: { mountLetter: string }) =>
    ipcRenderer.invoke('container_unmount', data)

const showNativeOpenDialog = async (options: any) =>
    ipcRenderer.sendSync('show_native_open_dialog', options)

const showNativeSaveDialog = async (options: any) =>
    ipcRenderer.sendSync('show_native_save_dialog', options)

const getVolumeDetails = async (path: string): Promise<DiskUsage> =>
    ipcRenderer.invoke('get_volume_details', path)

const getAvailableVolumes = async (): Promise<Drive[]> =>
    ipcRenderer.invoke('get_available_volumes')

const ipc = {
    on: (channel, listener): Electron.IpcRenderer =>
        ipcRenderer.on(channel, listener),
    removeListener: (channel, listener): Electron.IpcRenderer =>
        ipcRenderer.removeListener(channel, listener),
}

export const api = {
    sendPingToMainProcess,
    unMountEncryptedContainer,
    createEncryptedContainer,
    showNativeOpenDialog,
    showNativeSaveDialog,
    getVolumeDetails,
    getAvailableVolumes,
    mountEncryptedContainer,
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('api', api)
        contextBridge.exposeInMainWorld('ipc', ipc)
    } catch (error) {
        console.error(error)
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI
    // @ts-ignore (define in dts)
    window.api = api
    // @ts-ignore (define in dts)
    window.ipc = ipc
}
