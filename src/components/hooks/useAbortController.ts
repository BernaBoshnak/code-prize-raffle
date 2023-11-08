import { useRef, useEffect } from 'react'

const useAbortController = () => {
  const controllerRef = useRef(new AbortController())

  useEffect(() => {
    const controller = controllerRef.current

    return () => {
      controller.abort()
    }
  }, [])

  return controllerRef.current
}

export default useAbortController
