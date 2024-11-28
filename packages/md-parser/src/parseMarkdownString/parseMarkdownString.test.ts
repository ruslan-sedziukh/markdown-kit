import { parseMarkdownString } from './parseMarkdownString'

describe('parseMarkdownString', () => {
  describe('heading', () => {
    describe('of level 1', () => {
      it('parses correctly', () => {
        const heading = 'Heading one'

        expect(parseMarkdownString(`# ${heading}`)).toEqual([
          {
            type: 'heading-1',
            content: [`${heading}`],
          },
        ])
      })
    })

    describe('of level 2', () => {
      it('parses correctly', () => {
        const heading = 'Heading two'

        expect(parseMarkdownString(`## ${heading}`)).toEqual([
          {
            type: 'heading-2',
            content: [`${heading}`],
          },
        ])
      })
    })

    describe('of level 3', () => {
      it('parses correctly', () => {
        const heading = 'Heading three'

        expect(parseMarkdownString(`### ${heading}`)).toEqual([
          {
            type: 'heading-3',
            content: [`${heading}`],
          },
        ])
      })
    })
  })
})
