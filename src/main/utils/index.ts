export const generateAlphabetArray = (): string[] => {
    const alpha = Array.from(Array(26)).map((_e, i) => i + 65)
    const alphabet = alpha.map((x) => String.fromCharCode(x))
    return alphabet
}
