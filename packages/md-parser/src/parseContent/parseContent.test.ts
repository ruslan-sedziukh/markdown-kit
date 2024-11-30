import { parseContent } from '.'

describe('parseContent', () => {
  it('return correct emphasized content', () => {
    const content = 'Heading **one**'

    const parsed = parseContent(content)

    console.log('parsed:', parsed)

    expect(parseContent(content)).toEqual([
      'Heading ',
      {
        type: 'bold',
        content: 'one',
      },
    ])
  })
})
