import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { type DiskUsage } from 'diskusage'
import { type Drive } from 'drivelist'

// Custom APIs for renderer
const sendPingToMainProcess = (): void => ipcRenderer.send('ping')

const initializeVeracrypt = async (data: {
    path: string
    password: string
}): Promise<string> => ipcRenderer.invoke('vc_init', data)

const showNativeOpenDialog = async (options: any) =>
    ipcRenderer.sendSync('show_native_open_dialog', options)

const showNativeSaveDialog = async (options: any) =>
    ipcRenderer.sendSync('show_native_save_dialog', options)

const getVolumeDetails = async (path: string): Promise<DiskUsage> =>
    ipcRenderer.invoke('get_volume_details', path)

const getAvailableVolumes = async (): Promise<Drive[]> =>
    ipcRenderer.invoke('get_available_volumes')

export const api = {
    sendPingToMainProcess,
    initializeVeracrypt,
    showNativeOpenDialog,
    showNativeSaveDialog,
    getVolumeDetails,
    getAvailableVolumes,
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI
    // @ts-ignore (define in dts)
    window.api = api
}
