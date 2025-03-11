import { ParsedMarkdown, Types } from '@ruslan-sedziukh/md-types'

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
  if ((parsedMarkdown[parsedMarkdown.length - 1].type = Types.List)) {
  }
}
