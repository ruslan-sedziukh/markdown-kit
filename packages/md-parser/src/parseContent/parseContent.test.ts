import { parseContent } from '.'

describe('parseContent', () => {
  describe('emphasized content', () => {
    it('parsed correctly in case simple text', () => {
      const content = 'Heading **one** of two'

      expect(parseContent(content)).toEqual([
        'Heading ',
        {
          type: 'bold',
          content: ['one'],
        },
        ' of two',
      ])
    })

    it('returns correct content when only open symbols are without pair', () => {
      const content = 'Heading **one'

      expect(parseContent(content)).toEqual(['Heading **one'])
    })

    it('returns correct emphasized content inside another emphasized content', () => {
      const content = 'Heading ***o*ne**'

      expect(parseContent(content)).toEqual([
        'Heading ',
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
      ])
    })

    it('returns correct emphasized content inside another emphasized content', () => {
      const content = '*H*eading ***o*ne**'

      expect(parseContent(content)).toEqual([
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
      ])
    })
  })
})
