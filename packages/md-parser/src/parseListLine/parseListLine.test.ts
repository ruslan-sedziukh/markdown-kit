import { ParsedMarkdown } from '@ruslan-sedziukh/md-types'
import { parseListLine } from './parseListLine'

describe('parseListLine', () => {
  it('adds new list with a list item if there was no list before that line', () => {
    const listLine = '- first item'
    const parsedMarkdown: ParsedMarkdown = []

    parseListLine(listLine, parsedMarkdown)
  })
})
