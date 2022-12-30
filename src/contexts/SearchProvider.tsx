import { useState, createContext, Dispatch, SetStateAction } from "react"

interface SearchProviderContextType {
  values: { [key: string]: string }
  setValues: Dispatch<SetStateAction<{ [key: string]: string }>>
}

export const SearchContext = createContext({
  values: {},
  setValues: () => { alert('Missing config setMode()') },
} as SearchProviderContextType)

interface SearchProviderProps {
  children: React.ReactNode
  initialValues: { [key: string]: string }
}

export default function SearchProvider(props: SearchProviderProps) {
  const [values, setValues] = useState<{ [key: string]: string }>(props.initialValues)

  return (
    <SearchContext.Provider value={{ values, setValues }}>
      {props.children}
    </SearchContext.Provider >
  )
}