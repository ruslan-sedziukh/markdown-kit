import { InlineContent, InlineType } from 'md-types'
import { getElementType, getParsed, Temp } from './utils'

export const parseContent = (content: string): InlineContent[] => {
  let temp: Temp[] = []

  let i = 0

  while (i < content.length) {
    const { elSymbols, elType, tempElI } = getElementType({ content, i, temp })

    if (elType) {
      if (tempElI !== -1) {
        const tempEl = temp[tempElI]

        if (typeof tempEl !== 'string' && tempEl.type === InlineType.Link) {
          if (elSymbols === '](') {
            temp[tempElI] = {
              ...tempEl,
              content: getParsed(temp, tempElI + 1),
            }
          }

          if (elSymbols === ')') {
            temp[tempElI] = {
              content: tempEl.content,
              type: tempEl.type,
              // TODO: Write another function that can convert to string possible elements and temp elements
              href: temp[temp.length - 1] as string,
            }
          }
        } else {
          temp[tempElI] = {
            type: elType,
            content: getParsed(temp, tempElI + 1),
          }
        }

        temp = temp.slice(0, tempElI + 1)
      } else {
        temp.push({
          temp: [],
          type: elType,
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

  // console.log(temp)

  const parsed: InlineContent[] = getParsed(temp, 0)

  // console.log(parsed)

  return parsed
}
