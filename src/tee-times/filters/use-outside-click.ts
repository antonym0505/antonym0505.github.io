import { RefObject, useEffect } from 'react'

export const useOutsideClickHandler = (
  ref: RefObject<HTMLElement>,
  fn: (current?: HTMLElement | null) => void
) => {
  useEffect(() => {
    const handleBlur = (e: MouseEvent) =>
      e.target instanceof HTMLElement &&
      !ref.current?.contains(e.target) &&
      fn(ref.current)
    document.addEventListener('click', handleBlur)
    return () => document.removeEventListener('click', handleBlur)
  }, [ref, fn])
}

export default useOutsideClickHandler
