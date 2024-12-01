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
        parsed.push(content.slice(start, i))

        const newEl = {
          type,
          content: [
            content.slice(
              i + openChars.length,
              i + openChars.length + closingCharsIndex
            ),
          ],
        }

        parsed.push(newEl)

        parseElementContent(newEl.content[0], newEl)

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

const parseElementContent = (content: string, element: InlineElement) => {
  let start = 0
  let i = 0

  while (i < content.length) {
    const [type, openChars] = getElementType(content, i)

    if (type) {
      const restContent = content.slice(i + openChars.length)
      const match = restContent.match(RegExpByChar[openChars])
      const closingCharsIndex = match?.index

      if (closingCharsIndex) {
        element.content[0] = content.slice(start, i)

        const newEl = {
          type,
          content: [
            content.slice(
              i + openChars.length,
              i + openChars.length + closingCharsIndex
            ),
          ],
        }

        element.content.push(newEl)

        parseElementContent(newEl.content[0], newEl)
      }

      start = i + openChars.length
      i = start
    }

    i++
  }
}
