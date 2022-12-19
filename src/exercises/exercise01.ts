export function maskify(string: string): string {
  if (string.length <= 4) {
    return string
  }

  return (string.substring(string.length - 4)).padStart(string.length, '#');
}