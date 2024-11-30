import { InlineType, InlineElement } from 'md-types'

type TempElement = {
  temp?: true
  openChars?: string
  content: string | (string | TempElement)[]
  type: InlineType
}

export const parseContent = (content: string): InlineElement[] => {
  const parsed: (TempElement | string)[] = []

  for (let i = 0; i < content.length; i++) {
    const [type, openChars] = getElementType(content, i)

    if (type) {
      parsed.push(content.slice(0, i))

      const temp: TempElement = {
        temp: true,
        type,
        openChars,
        content: content.slice(i + openChars.length),
      }

      parsed.push(temp)

      parseTempElementContent(temp)

      break
    }
  }

  if (!parsed.length) {
    return [content]
  }

  // TODO: Extract content from all temp element objects that are in `parsed`

  // TODO: Concatenate all sequential strings in `parsed`

  // @ts-ignore
  return parsed
}

const parseTempElementContent = (temp: TempElement) => {
  if (typeof temp.content !== 'string') {
    return
  }

  for (let i = 0; i < temp.content.length; i++) {
    const [type, openChars] = getElementType(temp.content, i)

    if (type === temp.type) {
      temp.content = temp.content.slice(0, i)

      delete temp.temp
      delete temp.openChars
    }
  }
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
