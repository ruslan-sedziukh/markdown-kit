import { parseHeading } from '.'

describe.skip('parseHeading', () => {
  describe('heading of different levels', () => {
    it('parses correctly', () => {
      const heading = 'Heading'

      expect(parseHeading(`# ${heading}`)).toEqual({
        type: 'heading-1',
        content: [`${heading}`],
      })
      expect(parseHeading(`## ${heading}`)).toEqual({
        type: 'heading-2',
        content: [`${heading}`],
      })
      expect(parseHeading(`### ${heading}`)).toEqual({
        type: 'heading-3',
        content: [`${heading}`],
      })
    })
  })
})
