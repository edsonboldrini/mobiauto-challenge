import { PaletteMode } from "@mui/material"
import { useState, createContext, Dispatch, SetStateAction, useMemo, useEffect } from "react"
import { getColorModeCookie, setColorModeCookie } from "../services/ColorModeService"

interface ColorModeContextType {
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
} as ColorModeContextType)

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

  // _App Fallback
  useEffect(() => {
    const currentColorModeCookie = getColorModeCookie()

    if (currentColorModeCookie) {
      setColorMode(currentColorModeCookie)
    }
  }, [])

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode, toggleMode, isDarkMode }}>
      {props.children}
    </ColorModeContext.Provider >
  )
}