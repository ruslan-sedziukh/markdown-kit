import { InlineContent, InlineElement, InlineType } from 'md-types'
import { getElementType, RegExpByChar } from './utils'

type ParseHelperParams<T> = {
  type: T
  openChars: string
  i: number
  start: number
  parsed: InlineContent[]
  content: string
}

type ParseHelperReturn = [number, number]

const parseEmphasized = ({
  type,
  openChars,
  i,
  parsed,
  content,
  start,
}: ParseHelperParams<
  InlineType.Italic | InlineType.Bold
>): ParseHelperReturn => {
  let newStart = start
  let newI = i

  const restContent = content.slice(i + openChars.length)
  const closingCharsIndex = restContent.match(RegExpByChar[openChars])?.index

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

    newStart = i + openChars.length * 2 + (closingCharsIndex || 0)
    newI = newStart
  }

  return [newStart, newI]
}

const parseLink = ({
  type,
  openChars,
  i,
  parsed,
  content,
  start,
}: ParseHelperParams<InlineType.Link>): ParseHelperReturn => {
  let newStart = start
  let newI = i

  const restContent1 = content.slice(i + openChars.length)
  const textClosingCharIndex = restContent1.match(/\]\(/)?.index

  if (!textClosingCharIndex) {
    return [newStart, newI]
  }

  const restContent2 = restContent1.slice(textClosingCharIndex + 2)
  const hrefClosingCharIndex = restContent2.match(/\)/)?.index

  if (!hrefClosingCharIndex) {
    return [newStart, newI]
  }

  // Push text before link
  if (i - start > 0) {
    parsed.push(content.slice(start, i))
  }

  parsed.push({
    type: InlineType.Link,
    content: parseContent(restContent1.slice(0, textClosingCharIndex)),
    href: restContent2.slice(0, hrefClosingCharIndex),
  })

  const elCharsLength = 4

  newStart = i + hrefClosingCharIndex + textClosingCharIndex + elCharsLength
  newI = newStart

  return [newStart, newI]
}

export const parseContentOld = (content: string): InlineContent[] => {
  const parsed: InlineContent[] = []

  let start = 0
  let i = 0

  while (i < content.length) {
    const [type, openChars] = getElementType(content, i)

    if (type === InlineType.Bold || type === InlineType.Italic) {
      ;[start, i] = parseEmphasized({
        type,
        openChars,
        start,
        i,
        content,
        parsed,
      })
    }

    if (type === InlineType.Link) {
      ;[start, i] = parseLink({
        type,
        openChars,
        start,
        i,
        content,
        parsed,
      })
    }

    i++
  }

  // Push rest of the content as a texts
  if (start < content.length) {
    parsed.push(content.slice(start))
  }

  return parsed
}

type TempElement = {
  temp?: TempElement[]
  openSymbols?: string
}

type Temp = (TempElement & Partial<InlineElement>) | string

const isTempElement = (el: any): el is TempElement => {
  if (el.temp && typeof el?.openSymbols === 'string') {
    return true
  }

  return false
}

/**
 * @temp - array of parsed and temp elements
 * @return array of parsed elements cleaned from temp
 */
const getParsed = (temp: Temp[], i: number): InlineContent[] => {
  const result: InlineContent[] = []

  for (; i < temp.length; i++) {
    const el = temp[i]

    if (typeof el === 'string') {
      result.push(el)
    } else if (el.temp) {
      const prev = temp[i - 1]
      if (prev && typeof prev === 'string') {
        temp[temp.length - 1] = prev.concat(el.openSymbols || '')
      }
    } else {
      result.push(el.openSymbols || '')
    }
  }

  return result
}

export const parseContent = (
  content: string,
  tempExternal: Temp[] = []
): InlineContent[] => {
  const parsed: InlineContent[] = []
  const temp: Temp[] = [...tempExternal]

  const getTempEl = (openSymbols: string) =>
    temp.findIndex((el) => {
      if (isTempElement(el)) {
        return el.openSymbols === openSymbols
      }

      return false
    })

  let i = 0

  while (i < content.length) {
    if (content[i] === '*' && content[i + 1] === '*') {
      const tempElI = getTempEl('**')

      if (tempElI !== -1) {
        temp[tempElI] = {
          type: InlineType.Bold,
          content: getParsed(temp, tempElI),
        }
      } else {
        temp.push({
          temp: [],
          openSymbols: '**',
        })
      }

      i++
    } else {
      const prev = temp[temp.length - 1]

      if (typeof prev === 'string') {
        temp[temp.length - 1] = prev.concat(content[i])
      } else {
        temp.push(content[i])
      }
    }

    // if (content[i] === '*') {

    //   i = i + 2
    // }

    // if (type === InlineType.Link) {

    // }

    i++
  }

  return getParsed(temp, 0)
}
