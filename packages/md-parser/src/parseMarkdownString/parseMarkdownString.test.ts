import { parseMarkdownString } from './parseMarkdownString'

describe('parseMarkdownString', () => {
  it('is fine', () => {
    expect(parseMarkdownString('### Heading one')).toEqual({
      type: 'heading-3',
      content: ['Heading one'],
    })
  })
})
