import {
  InlineContent,
  InlineElement,
  InlineType,
  isInlineContent,
} from 'md-types'

export const getElementType = (
  content: string,
  i: number
):
  | { elType: InlineType; elSymbols: string }
  | { elType: null; elSymbols: null } => {
  if (content[i] === '*' && content[i + 1] === '*') {
    return { elType: InlineType.Bold, elSymbols: '**' }
  }

  if (content[i] === '*') {
    return { elType: InlineType.Italic, elSymbols: '*' }
  }

  if (content[i] === '[') {
    return { elType: InlineType.Link, elSymbols: '[' }
  }

  return { elType: null, elSymbols: null }
}

type TempElement = {
  temp?: TempElement[]
  openSymbols?: string
}

export type Temp = (TempElement & Partial<InlineElement>) | string

export const isTempElement = (el: any): el is TempElement => {
  if (el.temp && typeof el?.openSymbols === 'string') {
    return true
  }

  return false
}

/**
 * @temp - array of parsed and temp elements
 * @return array of parsed elements cleaned from temp
 */
export const getParsed = (temp: Temp[], i: number): InlineContent[] => {
  const result: InlineContent[] = []

  for (; i < temp.length; i++) {
    const el = temp[i]
    const prev = result[result.length - 1]

    if (typeof el === 'string') {
      if (typeof prev === 'string') {
        result[result.length - 1] = prev.concat(el)
      } else {
        result.push(el)
      }
    } else if (el.temp) {
      if (prev && typeof prev === 'string') {
        result[result.length - 1] = prev.concat(el.openSymbols || '')
      } else if (typeof el.openSymbols === 'string') {
        result.push(el.openSymbols)
      }
    } else if (el.openSymbols) {
      result.push(el.openSymbols)
    } else if (isInlineContent(el)) {
      result.push(el)
    }
  }

  return result
}
