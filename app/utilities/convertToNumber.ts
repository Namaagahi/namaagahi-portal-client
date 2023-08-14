export function convertToNumber(value: string | number) {
    if (typeof value === "number") return value
    
    const cleanedValue = value?.replace(/,/g, "")
    const parsedValue = parseFloat(cleanedValue)
  
    if (isNaN(parsedValue)) return null
    
    return parsedValue
  }