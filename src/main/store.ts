import { app, ipcMain } from 'electron'
import * as fs from 'fs'
import path from 'path'

export interface StoreInterface {
    [key: string]: unknown
}

class Store {
    data: StoreInterface
    path: string

    constructor() {
        this.path = this._getPath()
        this.data = {}
    }

    async init(): Promise<void> {
        this._initHandlers()
        this.data = await this._getData()
    }

    _getPath(): string {
        return path.join(app.getPath('userData'), 'store.json')
    }

    async _getData(): Promise<StoreInterface> {
        const data = await fs.promises.readFile(this.path)
        const parsedData = JSON.parse(data.toString())
        return parsedData
    }

    get(key): unknown {
        return this.data[key]
    }

    async set(key: string, val: unknown): Promise<StoreInterface> {
        this.data[key] = val
        await fs.promises.writeFile(this.path, JSON.stringify(this.data))
        return this.data
    }

    _initHandlers(): void {
        ipcMain.handle('set_store_key', async (_event, data) => {
            return this.set(data.key, data.value)
        })

        ipcMain.handle('get_store_key', async (_event, key) => {
            return this.get(key)
        })
    }
}

export default new Store()
