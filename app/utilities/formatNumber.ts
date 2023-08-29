export function formatNumber(number: number, separator: string): string {
    const options = {
    useGrouping: true,
    minimumFractionDigits: 0,
    }
    return number?.toLocaleString(undefined, options).replace(/,/g, separator)
}