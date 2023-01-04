import { PaletteMode } from '@mui/material'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export const NEXT_PUBLIC_APP_NAMESPACE = process.env.NEXT_PUBLIC_APP_NAMESPACE

export const ColorModeKey = `${NEXT_PUBLIC_APP_NAMESPACE}.color_mode_data`

export function getColorModeCookie(ctx?: any): PaletteMode | undefined {
  const parsedLocalAuth = parseCookies(ctx)[ColorModeKey]
  return parsedLocalAuth ? parsedLocalAuth as PaletteMode : undefined
}

export function setColorModeCookie(colorMode: PaletteMode | undefined) {
  if (!colorMode) {
    return destroyCookie(undefined, ColorModeKey)
  }

  setCookie(undefined, ColorModeKey, colorMode, {
    path: '/',
    maxAge: 60 * 60 * 1, // 1 hour
  })
}
