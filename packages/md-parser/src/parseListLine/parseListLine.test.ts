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
  describe('when appending a root level list item', () => {
    it.each([
      {
        test: 'appends new list with a list item if there was no list before that line',
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
        test: 'appends list item to existed list if it is the last parsed element',
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

      expect(parsedMarkdown).toEqual(expected)
    })
  })

  describe('correctly appends list item to a nested list', () => {
    it.each([
      {
        test: 'when last element of main list item of a nested list is a string',
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
        test: 'when last element of main list item of a nested list is not a string and not a list',
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
      {
        test: 'when last element of main list item of a nested list is a list',
        listLine: '  - third item',
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
                      {
                        type: Types.ListItem,
                        id,
                        content: ['third item'],
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

      expect(parsedMarkdown).toEqual(expected)
    })
  })

  describe('appends list item to correct nested list', () => {
    it.each([
      {
        test: 'when main list item of nested list exists',
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
        test: 'when main list item of nested list do not exist',
        listLine: '    - second item',
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
    ] as Test)('$test', ({ listLine, parsedMarkdown, expected }) => {
      parseListLine(listLine, parsedMarkdown)

      console.log('>>> parsedMarkdown:', parsedMarkdown)

      expect(parsedMarkdown).toEqual(expected)
    })
  })
})
