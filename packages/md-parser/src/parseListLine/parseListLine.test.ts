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
  describe('when adding a root level list item', () => {
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
        test: 'adds list item to existed list if it is the last parsed element',
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

  describe('when item level is not for a root level', () => {
    it.each([
      {
        test: 'correctly adds list item to correct nested list if last item of main list level item is a string',
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
        test: 'correctly adds list item to correct nested list if last element of main list level item is not a string and not a list',
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
        test: 'correctly adds list item to correct nested list if last element of main list level item is a list',
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

      console.log('>>> parsedMarkdown:', parsedMarkdown)

      expect(parsedMarkdown).toEqual(expected)
    })
  })
})
