import { ParsedMarkdown, Types } from '@ruslan-sedziukh/md-types'
import { getId } from '../utils'
import { parseContent } from '../parseContent'

/**
 * Parse list line. Add parsed representation of the line to a previous list if it exists or creates new one. That is why it mutates `parsedMarkdown` instead of returning something.
 *
 * @param line - line of markdown
 * @param parsedMarkdown - array of parsed elements
 */
export const parseListLine = (
  line: string,
  parsedMarkdown: ParsedMarkdown
): void => {
  const lastElement = parsedMarkdown[parsedMarkdown.length - 1]

  if (lastElement?.type === Types.UnorderedList) {
    lastElement.content.push({
      type: Types.ListItem,
      content: parseContent(getContentLine(line)),
      id: getId(),
    })
  } else {
    parsedMarkdown.push({
      type: Types.UnorderedList,
      content: [
        {
          type: Types.ListItem,
          content: parseContent(getContentLine(line)),
          id: getId(),
        },
      ],
      id: getId(),
    })
  }
}

/**
 *
 * @param line
 * @returns line without whitespaces and list open character (`-`)
 */
const getContentLine = (line: string) => {
  return line.trim().slice(2)
}
