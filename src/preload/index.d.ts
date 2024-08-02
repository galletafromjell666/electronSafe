import { api, ipc } from '.'
export {}

declare global {
    interface Window {
        electron: any
        api: typeof api
        ipc: typeof ipc
    }
}
