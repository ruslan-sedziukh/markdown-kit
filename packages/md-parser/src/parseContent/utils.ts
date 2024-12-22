import { InlineType } from 'md-types'

export const RegExpByChar = {
  '**': /\*\*/,
  '*': /\*/,
  '[': /\[/,
}

export const getElementType = (
  content: string,
  i: number
): [InlineType, string] | [null, null] => {
  if (content[i] === '*' && content[i + 1] === '*') {
    return [InlineType.Bold, '**']
  }

  if (content[i] === '*') {
    return [InlineType.Italic, '*']
  }

  if (content[i] === '[') {
    return [InlineType.Link, '[']
  }

  return [null, null]
}
