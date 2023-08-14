import { useEffect, useState } from 'react'

const useNumberFormatter = (number: number, separator: string): string => {
  const [formattedNumber, setFormattedNumber] = useState('')

  useEffect(() => {
    const formatNumber = (number: number, separator: string): string => {
      const options = {
        useGrouping: true,
        minimumFractionDigits: 0,
      }
      return number?.toLocaleString(undefined, options).replace(/,/g, separator)
    }

    const formatted: string = formatNumber(number, separator)
    setFormattedNumber(formatted)
  }, [number, separator])

  return formattedNumber
}

export default useNumberFormatter