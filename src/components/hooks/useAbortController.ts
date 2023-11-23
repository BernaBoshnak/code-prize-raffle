import { useEffect, useRef } from 'react'

const useAbortController = () => {
  const controllerRef = useRef(new AbortController())
  const isMountedRef = useRef(false)

  useEffect(() => {
    const controller = controllerRef.current

    isMountedRef.current = true

    return () => {
      isMountedRef.current = false

      window.requestAnimationFrame(() => {
        if (!isMountedRef.current) {
          controller.abort()
        }
      })
    }
  }, [])

  return controllerRef.current
}

export default useAbortController
