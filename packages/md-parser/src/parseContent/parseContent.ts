import { InlineType, InlineElement } from 'md-types'

type TempElement = {
  temp: true
  openChars: string
} & InlineElement

export const parseContent = (content: string): InlineElement[] => {
  const parsed: TempElement[] = []

  for (let i = 0; i < content.length; i++) {
    const [type, openChars] = getElementType(content, i)

    if (type) {
      parsed.push({
        temp: true,
        type,
        openChars,
        content: content.slice(i + openChars.length),
      })
    }
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

  return [null, null]
}
