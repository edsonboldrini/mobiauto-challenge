import { PaletteMode } from "@mui/material"
import { useState, createContext, Dispatch, SetStateAction, useMemo, useEffect } from "react"
import { getColorModeDataCookie, setColorModeDataCookie } from "../services/ColorModeService"

interface SearchProviderContextType {
  mode: PaletteMode
  setMode: Dispatch<SetStateAction<PaletteMode>>
  toggleMode: () => void
  isDarkMode: boolean
}

export const ColorModeContext = createContext({
  mode: 'light',
  setMode: () => { alert('Missing config setMode()') },
  toggleMode: () => { alert('Missing config toggleMode()') },
  isDarkMode: false
} as SearchProviderContextType)

interface ColorModeProviderProps {
  children: React.ReactNode
  initialMode?: PaletteMode
}

export default function ColorModeProvider(props: ColorModeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>(props.initialMode ?? 'light')

  const isDarkMode = useMemo(() => { return mode === 'dark' }, [mode])

  function toggleMode() {
    const newMode = mode === 'dark' ? 'light' : 'dark'
    setMode(newMode)
    setColorModeDataCookie(newMode)
  }

  useEffect(() => {
    const newColorModeData = getColorModeDataCookie()

    if (newColorModeData) {
      setMode(newColorModeData)
    }
  }, [])

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleMode, isDarkMode }}>
      {props.children}
    </ColorModeContext.Provider >
  )
}