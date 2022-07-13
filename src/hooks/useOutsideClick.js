import { useEffect } from 'react'

const useOutsideClick = (ref, callback, attached = true) => {
  useEffect(() => {
    if (!attached) return

    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [attached])
}

export default useOutsideClick
