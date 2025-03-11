import { ParsedMarkdown, Types } from '@ruslan-sedziukh/md-types'
import { parseListLine } from './parseListLine'

const id = 'uuid'

jest.mock('../utils', () => ({
  getId: () => id,
}))

type Test = {
  test: string
  listLine: string
  parsedMarkdown: ParsedMarkdown
  expected: ParsedMarkdown
}[]

describe('parseListLine', () => {
  it.each([
    {
      test: 'adds new list with a list item if there was no list before that line',
      listLine: '- first item',
      parsedMarkdown: [],
      expected: [
        {
          type: Types.UnorderedList,
          content: [
            {
              type: Types.ListItem,
              content: ['first item'],
              id,
            },
          ],
          id,
        },
      ],
    },
    {
      test: 'adds list item to existed list if is the last parsed element',
      listLine: '- second item',
      parsedMarkdown: [
        {
          type: Types.UnorderedList,
          content: [
            {
              type: Types.ListItem,
              content: ['first item'],
              id,
            },
          ],
          id,
        },
      ],
      expected: [
        {
          type: Types.UnorderedList,
          content: [
            {
              type: Types.ListItem,
              content: ['first item'],
              id,
            },
            {
              type: Types.ListItem,
              content: ['second item'],
              id,
            },
          ],
          id,
        },
      ],
    },
  ] as Test)('$test', ({ listLine, parsedMarkdown, expected }) => {
    parseListLine(listLine, parsedMarkdown)

    console.log('>>> parsedMarkdown:', parsedMarkdown)

    expect(parsedMarkdown).toEqual(expected)
  })
})
