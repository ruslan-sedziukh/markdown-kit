import { InlineType, InlineElement } from 'md-types'

type TempElement = {
  temp?: true
  openChars?: string
  content: string | (string | TempElement)[]
  type: InlineType
}

type TempContent = (TempElement | string)[]

export const parseContent = (content: string): InlineElement[] => {
  const parsed: TempContent = []

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

  const extracted = extractTempElementsContent(parsed)

  // TODO: Concatenate all sequential strings in `parsed`
  // const concatenated = concatenateStringElements(extracted)

  // @ts-ignore
  return extracted
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

const extractTempElementsContent = (content: TempContent) =>
  content.map((el) => {
    if (typeof el !== 'string' && el.temp) {
      return el.content
    }

    return el
  })

const concatenateStringElements = (content: InlineElement[]) => {
  const concatenated: InlineElement[] = []

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
