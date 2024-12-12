import type { InlineContent } from 'md-types'
import { getElementType, RegExpByChar } from './utils'

export const parseContent = (content: string): InlineContent[] => {
  const parsed: InlineContent[] = []

  let start = 0
  let i = 0

  while (i < content.length) {
    const [type, openChars] = getElementType(content, i)

    if (type) {
      const restContent = content.slice(i + openChars.length)
      const closingCharsIndex = restContent.match(
        RegExpByChar[openChars]
      )?.index

      if (closingCharsIndex) {
        if (i - start > 0) {
          parsed.push(content.slice(start, i))
        }

        const elContent = content.slice(
          i + openChars.length,
          i + openChars.length + closingCharsIndex
        )
        const newEl = {
          type,
          content: parseContent(elContent),
        }

        parsed.push(newEl)

        start = i + openChars.length * 2 + closingCharsIndex
        i = start
      }
    }

    i++
  }

  if (start < content.length) {
    parsed.push(content.slice(start))
  }

  return parsed
}
