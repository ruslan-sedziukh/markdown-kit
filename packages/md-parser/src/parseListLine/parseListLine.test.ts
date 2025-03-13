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
    // {
    //   test: 'adds new list with a list item if there was no list before that line',
    //   listLine: '- first item',
    //   parsedMarkdown: [],
    //   expected: [
    //     {
    //       type: Types.UnorderedList,
    //       content: [
    //         {
    //           type: Types.ListItem,
    //           content: ['first item'],
    //           id,
    //         },
    //       ],
    //       id,
    //     },
    //   ],
    // },
    // {
    //   test: 'adds list item to existed list if it is the last parsed element',
    //   listLine: '- second item',
    //   parsedMarkdown: [
    //     {
    //       type: Types.UnorderedList,
    //       content: [
    //         {
    //           type: Types.ListItem,
    //           content: ['first item'],
    //           id,
    //         },
    //       ],
    //       id,
    //     },
    //   ],
    //   expected: [
    //     {
    //       type: Types.UnorderedList,
    //       content: [
    //         {
    //           type: Types.ListItem,
    //           content: ['first item'],
    //           id,
    //         },
    //         {
    //           type: Types.ListItem,
    //           content: ['second item'],
    //           id,
    //         },
    //       ],
    //       id,
    //     },
    //   ],
    // },
    {
      test: 'correctly adds list item if there is is double spacing',
      listLine: '  - second item',
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
          id,
          content: [
            {
              type: Types.ListItem,
              id,
              content: [
                'first item',
                {
                  type: Types.UnorderedList,
                  id,
                  content: [
                    {
                      type: Types.ListItem,
                      id,
                      content: ['second item'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      test: 'correctly adds list item if there is is double spacing',
      listLine: '  - second item',
      parsedMarkdown: [
        {
          type: Types.UnorderedList,
          content: [
            {
              type: Types.ListItem,
              content: [
                {
                  type: Types.Bold,
                  id,
                  content: ['first item'],
                },
              ],
              id,
            },
          ],
          id,
        },
      ],
      expected: [
        {
          type: Types.UnorderedList,
          id,
          content: [
            {
              type: Types.ListItem,
              id,
              content: [
                {
                  type: Types.Bold,
                  id,
                  content: ['first item'],
                },

                {
                  type: Types.UnorderedList,
                  id,
                  content: [
                    {
                      type: Types.ListItem,
                      id,
                      content: ['second item'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ] as Test)('$test', ({ listLine, parsedMarkdown, expected }) => {
    parseListLine(listLine, parsedMarkdown)

    console.log('>>> parsedMarkdown:', parsedMarkdown)

    expect(parsedMarkdown).toEqual(expected)
  })
})
