import { parseHeading } from '.'

const id = 'uuid'

jest.mock('../utils', () => ({
  getId: () => id,
}))
describe('parseHeading', () => {
  describe('heading of different levels', () => {
    it('parses correctly', () => {
      const heading = 'Heading'

      expect(parseHeading(`# ${heading}`)).toEqual({
        type: 'heading-1',
        id,
        content: [`${heading}`],
      })
      expect(parseHeading(`## ${heading}`)).toEqual({
        type: 'heading-2',
        id,
        content: [`${heading}`],
      })
      expect(parseHeading(`### ${heading}`)).toEqual({
        type: 'heading-3',
        id,
        content: [`${heading}`],
      })
    })
  })
})
