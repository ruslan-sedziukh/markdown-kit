import type { InlineContent, InlineType } from 'md-types'
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
}: ParseHelperParams<'link'>): ParseHelperReturn => {
  let newStart = start
  let newI = i

  return [0, 0]
}

export const parseContent = (content: string): InlineContent[] => {
  const parsed: InlineContent[] = []

  let start = 0
  let i = 0

  while (i < content.length) {
    const [type, openChars] = getElementType(content, i)

    if (type === 'bold' || type === 'italic') {
      ;[start, i] = parseEmphasized({
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
