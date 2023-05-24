"use client"
import { CgDarkMode } from 'react-icons/cg'
import { useTheme } from "next-themes"

const ToggleButton = () => {

  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <CgDarkMode 
      className="cursor-pointer hover:text-gray-700 transition-all dark:hover:text-gray-400"
      size={30}
      onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
    />
  )
}

export default ToggleButton