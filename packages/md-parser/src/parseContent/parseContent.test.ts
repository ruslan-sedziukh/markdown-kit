import { parseContent } from '.'

describe('parseContent', () => {
  it('return correct emphasized content', () => {
    const content = 'Heading **one** of two'

    const parsed = parseContent(content)

    console.log('parsed:', parsed)

    expect(parseContent(content)).toEqual([
      'Heading ',
      {
        type: 'bold',
        content: ['one'],
      },
      ' of two',
    ])
  })

  it('return correct content when only open symbols are without pair', () => {
    const content = 'Heading **one'

    const parsed = parseContent(content)

    console.log('parsed:', parsed)

    expect(parseContent(content)).toEqual(['Heading **one'])
  })

  it.skip('return correct emphasized content inside another emphasized content', () => {
    const content = 'Heading ***o*ne**'

    const parsed = parseContent(content)

    console.log('parsed:', parsed)

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
})
