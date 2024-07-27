import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

// Custom APIs for renderer
const sendPingToMainProcess = () => ipcRenderer.send("ping");

const initializeVeracrypt = async (data: { path: string; password: string }) =>
  ipcRenderer.invoke("vc_init", data);

const showNativeOpenDialog = async (options: any) =>
  ipcRenderer.sendSync("show_native_open_dialog", options);

export const api = {
  sendPingToMainProcess,
  initializeVeracrypt,
  showNativeOpenDialog,
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
