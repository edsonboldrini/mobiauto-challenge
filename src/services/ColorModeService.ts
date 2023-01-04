import { PaletteMode } from '@mui/material'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export const NEXT_PUBLIC_APP_NAMESPACE = process.env.NEXT_PUBLIC_APP_NAMESPACE

export const ColorModeDataKey = `${NEXT_PUBLIC_APP_NAMESPACE}.color_mode_data`

export function getColorModeDataCookie(ctx?: any): PaletteMode | null {
  const parsedLocalAuth = parseCookies(ctx)[ColorModeDataKey]
  return parsedLocalAuth ? parsedLocalAuth as PaletteMode : null
}

export function setColorModeDataCookie(colorModeData: PaletteMode | null) {
  if (!colorModeData) {
    return destroyCookie(undefined, ColorModeDataKey)
  }

  setCookie(undefined, ColorModeDataKey, colorModeData, {
    path: '/',
    maxAge: 60 * 60 * 1, // 1 hour
  })
}
