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

type TempElement =
  | InlineContent
  | {
      temp: true
      openSymbols: string
    }

export const parseContent = (content: string): InlineContent[] => {
  const parsed: InlineContent[] = []
  const temp: TempElement[] = []

  return parsed
}
