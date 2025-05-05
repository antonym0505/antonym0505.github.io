import { useCallback } from 'react'
import ResponseJson from './response-json'

const useUtils = () => {
  const isValidJSON = useCallback((json?: unknown): json is ResponseJson[] => {
    return Array.isArray(json) && Array.isArray(json[0].teetimes)
  }, [])

  return { isValidJSON }
}

export default useUtils
