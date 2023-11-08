import { useState, useEffect, useCallback } from 'react'

const usePersistedState = <T>(key: string, listen = false) => {
  const [value, setValue] = useState<T | null>(() => {
    const val = localStorage.getItem(key)

    return val ? JSON.parse(val) : val
  })

  const persistValue = useCallback(
    (value: T | null) => {
      setValue(value)
      if (value == null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
    },
    [key],
  )

  useEffect(() => {
    const handleStorage = (storage: StorageEvent) => {
      if (storage.key === key) {
        const value = storage.newValue
          ? JSON.parse(storage.newValue)
          : storage.newValue

        setValue(value)
      }
    }

    if (listen) {
      window.addEventListener('storage', handleStorage)
    }

    return () => {
      if (listen) {
        window.removeEventListener('storage', handleStorage)
      }
    }
  }, [key, listen])

  return [value, persistValue] as const
}

export default usePersistedState
