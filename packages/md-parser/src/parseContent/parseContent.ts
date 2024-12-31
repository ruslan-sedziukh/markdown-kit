import { InlineContent, InlineType } from 'md-types'
import { getElementType, getParsed, Temp } from './utils'

export const parseContent = (
  content: string,
  tempExternal: Temp[] = []
): InlineContent[] => {
  let temp: Temp[] = [...tempExternal]

  let i = 0

  while (i < content.length) {
    const { elSymbols, elType, tempElI } = getElementType({ content, i, temp })

    if (elType) {
      if (tempElI !== -1) {
        temp[tempElI] = {
          type: elSymbols === '**' ? InlineType.Bold : InlineType.Italic,
          content: getParsed(temp, tempElI + 1),
        }

        temp = temp.slice(0, tempElI + 1)
      } else {
        temp.push({
          temp: [],
          openSymbols: elSymbols,
        })
      }

      if (elSymbols.length === 2) {
        i++
      }
    } else {
      const prev = temp[temp.length - 1]

      if (typeof prev === 'string') {
        temp[temp.length - 1] = prev.concat(content[i])
      } else {
        temp.push(content[i])
      }
    }

    i++
  }

  console.log(temp)

  const parsed: InlineContent[] = getParsed(temp, 0)

  console.log(parsed)

  return parsed
}
