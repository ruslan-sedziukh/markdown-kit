import { InlineType, InlineElement } from 'md-types'

type TempElement = {
  temp: true
  openChars: string
} & InlineElement

export const parseContent = (content: string): InlineElement[] => {
  const parsed: (TempElement | string)[] = []

  for (let i = 0; i < content.length; i++) {
    const [type, openChars] = getElementType(content, i)

    if (type) {
      parsed.push(content.slice(0, i))

      parsed.push({
        temp: true,
        type,
        openChars,
        content: content.slice(i + openChars.length),
      })
    }
  }

  if (!parsed.length) {
    return [content]
  }

  // TODO: Extract content from all temp element objects that are in `parsed`

  // TODO: Concatenate all sequential strings in `parsed`

  return parsed
}

const getElementType = (
  content: string,
  i: number
): [InlineType, string] | [null, null] => {
  if (content[i] === '*' && content[i + 1] === '*') {
    return ['bold', '**']
  }

  return [null, null]
}
