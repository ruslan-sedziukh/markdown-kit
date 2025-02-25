import { ParsedMarkdown } from '@ruslan-sedziukh/md-types'
import { parseContent } from '../parseContent'
import { parseHeading } from '../parseHeading'

export const parseMarkdownString = (md: string): ParsedMarkdown => {
  const lines = md.split('\n')

  const parsedLines = lines.map((line) => {
    if (line[0] === '#') {
      return parseHeading(line)
    }

    return { type: 'paragraph' as const, content: parseContent(line) }
  })

  return parsedLines
}
