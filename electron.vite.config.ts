import React from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'

const alias = {
    '@renderer': resolve('src/renderer/src'),
    '@preload': resolve('src/preload'),
    '@main': resolve('src/main'),
}

export default defineConfig({
    main: {
        resolve: {
            alias,
        },
        plugins: [externalizeDepsPlugin()],
    },
    preload: {
        resolve: {
            alias,
        },
        plugins: [externalizeDepsPlugin()],
    },
    renderer: {
        resolve: {
            alias,
        },
        plugins: [React()],
    },
})
