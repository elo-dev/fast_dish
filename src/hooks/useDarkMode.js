import { useEffect, useState } from 'react'

function useDarkMode() {
  const [isDarkMode, setDarkMode] = useState(localStorage.getItem('theme'))

  console.log(isDarkMode)

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? true : false)
  }, [isDarkMode])

  return {
    isDarkMode,
    toggle: () => setDarkMode((prev) => !prev),
  }
}

export default useDarkMode
