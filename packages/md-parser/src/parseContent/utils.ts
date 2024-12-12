import type { InlineType } from 'md-types'

export const RegExpByChar = {
  '**': /\*\*/,
  '*': /\*/,
}

export const getElementType = (
  content: string,
  i: number
): [InlineType, string] | [null, null] => {
  if (content[i] === '*' && content[i + 1] === '*') {
    return ['bold', '**']
  }

  if (content[i] === '*') {
    return ['italic', '*']
  }

  return [null, null]
}
