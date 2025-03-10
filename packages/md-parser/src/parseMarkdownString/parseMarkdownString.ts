import { ParsedMarkdown, Types } from '@ruslan-sedziukh/md-types'
import { parseContent } from '../parseContent'
import { parseHeading } from '../parseHeading'
import { getId } from '../utils'
// import { parseListLine } from '../parseListLine'

export const parseMarkdownString = (md: string): ParsedMarkdown => {
  const lines = md.split('\n').filter((line) => !!line)

  const parsedMarkdown: ParsedMarkdown = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line[0] === '#') {
      parsedMarkdown.push(parseHeading(line))
    }

    // if (isListLine(line)) {
    //   parsedMarkdown.push(parseListLine(line, parsedMarkdown))
    // }
    else if (line.length > 0) {
      parsedMarkdown.push({
        type: Types.paragraph,
        content: parseContent(line),
        id: getId(),
      })
    }
  }

  return parsedMarkdown
}

const isListLine = (line: string): boolean => {
  let i = 0

  while (line[i]) {
    if (line[i] === '-') {
      return true
    }

    if (line[i] === ' ') {
      i++
      continue
    }

    return false
  }

  return false
}
