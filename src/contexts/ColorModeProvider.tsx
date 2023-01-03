import { PaletteMode } from "@mui/material"
import { useState, createContext, Dispatch, SetStateAction, useMemo } from "react"

interface SearchProviderContextType {
  mode: PaletteMode
  setMode: Dispatch<SetStateAction<PaletteMode>>
  toggleMode: () => void
  isLightMode: boolean
}

export const ColorModeContext = createContext({
  mode: 'light',
  setMode: () => { alert('Missing config setMode()') },
  toggleMode: () => { alert('Missing config toggleMode()') },
  isLightMode: true
} as SearchProviderContextType)

interface ColorModeProviderProps {
  children: React.ReactNode
  initialMode: PaletteMode
}

export default function ColorModeProvider(props: ColorModeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>(props.initialMode)

  const isLightMode = useMemo(() => { return mode === 'light' }, [mode])

  function toggleMode() {
    setMode((previousMode) => previousMode === 'light' ? 'dark' : 'light')
  }

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleMode, isLightMode }}>
      {props.children}
    </ColorModeContext.Provider >
  )
}