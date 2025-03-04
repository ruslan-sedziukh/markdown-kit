import { v4 as uuidv4 } from 'uuid'
import { ParsedMarkdown } from '@ruslan-sedziukh/md-types'
import { parseContent } from '../parseContent'
import { parseHeading } from '../parseHeading'

export const parseMarkdownString = (md: string): ParsedMarkdown => {
  const lines = md.split('\n')

  const parsedLines = lines
    .map((line) => {
      if (line[0] === '#') {
        return parseHeading(line)
      }

      if (line.length > 0) {
        return {
          type: 'paragraph' as const,
          content: parseContent(line),
          id: uuidv4(),
        }
      }

      return null
    })
    .filter((line) => !!line)

  return parsedLines
}
