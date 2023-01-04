import { PaletteMode } from "@mui/material"
import { useState, createContext, Dispatch, SetStateAction, useMemo, useEffect } from "react"
import { getColorModeCookie, setColorModeCookie } from "../services/ColorModeService"

interface SearchProviderContextType {
  colorMode: PaletteMode
  setColorMode: Dispatch<SetStateAction<PaletteMode>>
  toggleMode: () => void
  isDarkMode: boolean
}

export const ColorModeContext = createContext({
  colorMode: 'light',
  setColorMode: () => { alert('Missing config setMode()') },
  toggleMode: () => { alert('Missing config toggleMode()') },
  isDarkMode: false
} as SearchProviderContextType)

interface ColorModeProviderProps {
  children: React.ReactNode
  initialMode: PaletteMode
}

export default function ColorModeProvider(props: ColorModeProviderProps) {
  const [colorMode, setColorMode] = useState<PaletteMode>(props.initialMode)

  const isDarkMode = useMemo(() => { return colorMode === 'dark' }, [colorMode])

  function toggleMode() {
    const newMode = colorMode === 'dark' ? 'light' : 'dark'
    setColorMode(newMode)
    setColorModeCookie(newMode)
  }

  useEffect(() => {
    const currentColorModeCookie = getColorModeCookie()

    if (currentColorModeCookie && currentColorModeCookie != props.initialMode) {
      setColorMode(currentColorModeCookie!)
    }

    if (!currentColorModeCookie) {
      setColorModeCookie(props.initialMode)
    }
  }, [])

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode, toggleMode, isDarkMode }}>
      {props.children}
    </ColorModeContext.Provider >
  )
}