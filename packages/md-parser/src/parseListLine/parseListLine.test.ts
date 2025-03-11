import { ParsedMarkdown, Types } from '@ruslan-sedziukh/md-types'
import { parseListLine } from './parseListLine'

const id = 'uuid'

jest.mock('../utils', () => ({
  getId: () => id,
}))

describe('parseListLine', () => {
  it('adds new list with a list item if there was no list before that line', () => {
    const listLine = '- first item'
    const parsedMarkdown: ParsedMarkdown = []
    const expected = [
      {
        type: Types.UnorderedList,
        content: ['first item'],
        id,
      },
    ]

    parseListLine(listLine, parsedMarkdown)

    console.log('>>> parsedMarkdown:', parsedMarkdown)

    expect(parsedMarkdown).toEqual(expected)
  })
})
