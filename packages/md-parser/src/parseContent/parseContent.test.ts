import { parseContent } from '.'

describe('parseContent', () => {
  it('return correct emphasized content', () => {
    const content = 'Heading **one**'

    expect(parseContent(content)).toEqual([
      'Heading',
      {
        type: 'bold',
        content: 'one',
      },
    ])
  })
})
