import { parseHeading } from '../parseHeading'

export const parseMarkdownString = (md: string) => {
  const lines = md.split('\n')

  const parsedLines = lines.map((line) => {
    if (line[0] === '#') {
      return parseHeading(line)
    }
  })

  return parsedLines
}
