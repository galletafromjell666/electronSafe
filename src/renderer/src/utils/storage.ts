export const convertBytesToGigaBytes = (a: number): number => {
    return Number((a / 1073741824).toFixed(2))
}

export const calculateUsedPercent = (total: number, free: number): number => {
    return Math.floor((1 - free / total) * 100) || 0
}
