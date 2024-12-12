import { InlineType, InlineContent } from 'md-types'

type TempElement = {
  temp?: true
  openChars?: string
  content: (string | TempElement)[]
  type: InlineType
}

type TempContent = (TempElement | string)[]

export const parseContent = (content: string): InlineContent[] => {
  const parsed: TempContent = []

  for (let i = 0; i < content.length; i++) {
    const [type, openChars] = getElementType(content, i)

    if (type) {
      parsed.push(content.slice(0, i))

      const temp: TempElement = {
        temp: true,
        type,
        openChars,
        content: [],
      }

      parsed.push(temp)

      parseTempElementContent(temp, content, i)

      break
    }
  }

  if (!parsed.length) {
    return [content]
  }

  const extracted = extractTempElementsContent(parsed)

  // TODO: Concatenate all sequential strings in `parsed`
  // const concatenated = concatenateStringElements(extracted)

  // @ts-ignore
  return extracted
}

const parseTempElementContent = (
  temp: TempElement,
  content: string,
  start: number
) => {
  let str = ''

  for (let i = start; i < temp.content.length; i++) {
    const [type, openChars] = getElementType(content, i)

    if (type === temp.type) {
      temp.content.push(str)
      delete temp.temp
      delete temp.openChars
    } else if (type) {
      temp.content.push(str)
      temp.content.push({
        temp: true,
        type,
        openChars,
        content: [],
      })
      str = ''
    } else {
      str += content[i]
    }
  }
}

const extractTempElementsContent = (content: TempContent) =>
  content.map((el) => {
    if (typeof el !== 'string' && el.temp) {
      return el.content
    }

    return el
  })

const concatenateStringElements = (content: InlineContent[]) => {
  const concatenated: InlineContent[] = []

  for (let i = 0; i < content.length; i++) {
    if (typeof content[i] === 'string' && typeof content[i + 1] === 'string') {
      // @ts-ignore
      concatenated.push(content[i] + content[i + 1])
      i++
    } else {
      concatenated.push(content[i])
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
