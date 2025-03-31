export const isLink = (str: string) => {
  try {
    const url = new URL(str)
    return (
      url.protocol === 'http:' ||
      url.protocol === 'https:' ||
      url.protocol === 'ftp:'
    )
  } catch (_) {
    return false
  }
}
