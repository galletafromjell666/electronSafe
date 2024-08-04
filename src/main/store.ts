import { app, ipcMain } from 'electron'
import * as fs from 'fs'
import path from 'path'

export interface StoreInterface {
    [key: string]: unknown
}

/*
const formatExecutableLocation =
        'C:\\Program Files\\VeraCrypt\\VeraCrypt Format.exe'

const normalExecutableLocation =
        'C:\\Program Files\\VeraCrypt\\VeraCrypt.exe'
*/

const defaultStoreValue = {
    mainProgramLocation: 'C:\\Program Files\\VeraCrypt\\VeraCrypt.exe',
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

    get(key): unknown {
        return this.data[key]
    }

    async set(key: string, val: unknown): Promise<StoreInterface> {
        try {
            this.data[key] = val
            await fs.promises.writeFile(this.path, JSON.stringify(this.data))
        } catch (error) {
            console.error('Error writing to the file:', error)
        }
        return this.data
    }

    _getPath(): string {
        return path.join(app.getPath('userData'), 'store.json')
    }

    async _getData(): Promise<StoreInterface> {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8')
            if (!data) {
                return defaultStoreValue
            }
            const parsedData = JSON.parse(data)
            return parsedData
        } catch (error) {
            console.error('Error reading or parsing the file:', error)
            return defaultStoreValue
        }
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
