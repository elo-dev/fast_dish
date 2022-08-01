import { createContext, useContext, useState } from 'react'

export const THEME_LIGHT = 'light'
export const THEME_DARK = 'dark'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem('theme'))
  )

  const changeTheme = (checked) => {
    setIsDarkMode(checked)
    localStorage.setItem('theme', checked)
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

export const useTheme = () => useContext(ThemeContext)
