import { useEffect, useState } from 'react'

// eslint-disable-next-line
export default function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    },
    [value],
  )

  return debouncedValue
}