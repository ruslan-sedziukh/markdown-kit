import { parseContent } from '.'

describe('parseContent', () => {
  describe('emphasized content', () => {
    it.each([
      {
        text: 'is parsed correctly in case simple text',
        content: 'Heading **one** of two',
        expected: [
          'Heading ',
          {
            type: 'bold',
            content: ['one'],
          },
          ' of two',
        ],
      },
      {
        text: 'is not parsed when there are only opened symbols',
        content: 'Heading **one',
        expected: ['Heading **one'],
      },
      {
        text: 'is parsed inside another emphasized content',
        content: '*H*eading ***o*ne**',
        expected: [
          {
            type: 'italic',
            content: ['H'],
          },
          'eading ',
          {
            type: 'bold',
            content: [
              {
                type: 'italic',
                content: ['o'],
              },
              'ne',
            ],
          },
        ],
      },
    ])('$text', ({ content, expected }) => {
      expect(parseContent(content)).toEqual(expected)
    })
  })

  describe('link', () => {
    it.each([
      {
        text: 'is parsed in simple text',
        content: 'Look at [this](www.test.com)',
        expected: [
          'Look at ',
          {
            type: 'link',
            content: ['this'],
            href: 'www.test.com',
          },
        ],
      },
    ])('$text', ({ content, expected }) => {
      expect(parseContent(content)).toEqual(expected)
    })
  })
})
