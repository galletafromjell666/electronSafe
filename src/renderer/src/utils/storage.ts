export const convertBytesToGigaBytes = (a: number) => {
    return Number((a / 1073741824).toFixed(2))
}

export const calculateUsedPercent = (total: number, free: number) => {
    return Math.floor((1 - free / total) * 100) || 0
}
