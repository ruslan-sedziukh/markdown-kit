import {
  InlineContent,
  InlineElement,
  InlineType,
  isInlineContent,
} from 'md-types'

const getTempEl = (temp: Temp[], openSymbols: string) =>
  temp.findIndex((el) => {
    if (isTempElement(el)) {
      return el.openSymbols === openSymbols
    }

    return false
  })

export const getElementType = ({
  content,
  i,
  temp,
}: {
  content: string
  i: number
  temp: Temp[]
}):
  | { elType: InlineType; elSymbols: string; tempElI: number }
  | { elType: null; elSymbols: null; tempElI: number } => {
  if (content[i] === '*' && content[i + 1] === '*') {
    return {
      elType: InlineType.Bold,
      elSymbols: '**',
      tempElI: getTempEl(temp, '**'),
    }
  }

  if (content[i] === '*') {
    return {
      elType: InlineType.Italic,
      elSymbols: '*',
      tempElI: getTempEl(temp, '*'),
    }
  }

  if (content[i] === '[') {
    return {
      elType: InlineType.Link,
      elSymbols: '[',
      tempElI: getTempEl(temp, '['),
    }
  }

  return { elType: null, elSymbols: null, tempElI: -1 }
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
