import type { InlineContent } from 'md-types'
import { getElementType, RegExpByChar } from './utils'

type ParseParams = {
  type: 'italic' | 'bold'
  openChars: string
  i: number
  start: number
  parsed: InlineContent[]
  content: string
}

const parseEmphasized = ({
  type,
  openChars,
  i,
  parsed,
  content,
  start,
}: ParseParams) => {
  const restContent = content.slice(i + openChars.length)
  const closingCharsIndex = restContent.match(RegExpByChar[openChars])?.index

  let newStart = start
  let newI = i

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
