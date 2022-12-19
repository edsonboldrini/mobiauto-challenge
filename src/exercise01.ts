export function maskify(txt: string): string {
  if (txt.length <= 4) {
    return txt
  }

  return (txt.substring(txt.length - 4)).padStart(txt.length, '#');
}