import { ParsedMarkdown, Types } from '@ruslan-sedziukh/md-types'
import { parseContent } from '../parseContent'
import { parseHeading } from '../parseHeading'
import { getId } from '../utils'
import { parseListLine } from '../parseListLine'
import { Configs } from '../types/configs'

export const parseMarkdown = (
  md: string,
  configs?: Configs
): ParsedMarkdown => {
  const lines = md.split('\n')

  const parsedMarkdown: ParsedMarkdown = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line[0] === '#') {
      parsedMarkdown.push(parseHeading(line, configs))
    } else if (isListLine(line)) {
      parseListLine(line, parsedMarkdown, configs)
    } else if (line.length > 0) {
      parsedMarkdown.push({
        type: Types.Paragraph,
        content: parseContent(line, { configs }),
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
