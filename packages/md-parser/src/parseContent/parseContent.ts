import { InlineType, InlineContent, InlineElement } from 'md-types'

export const parseContent = (content: string): InlineContent[] => {
  const parsed: InlineContent[] = []

  let start = 0
  let i = 0

  while (i < content.length) {
    const [type, openChars] = getElementType(content, i)

    if (type) {
      const restContent = content.slice(i + openChars.length)
      const match = restContent.match(RegExpByChar[openChars])
      const closingCharsIndex = match?.index

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

const getElementType = (
  content: string,
  i: number
): [InlineType, string] | [null, null] => {
  if (content[i] === '*' && content[i + 1] === '*') {
    return ['bold', '**']
  }

  if (content[i] === '*') {
    return ['italic', '*']
  }

  return [null, null]
}

const RegExpByChar = {
  '**': /\*\*/,
  '*': /\*/,
}
