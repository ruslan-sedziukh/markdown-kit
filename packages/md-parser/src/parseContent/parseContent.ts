import { InlineContent, InlineType } from 'md-types'
import {
  getElementType,
  getParsed,
  getTempElI,
  isTempLink,
  Temp,
} from './utils'

export const parseContent = (
  // content that should be parsed
  content: string,
  // starting index
  startI: number = 0,
  // starting temp array
  tempExternal: Temp[] = []
): InlineContent[] => {
  let temp: Temp[] = tempExternal

  let i = startI

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
      } else if (elSymbols === '[') {
        temp.push({
          temp: true,
          type: elType,
          openSymbols: elSymbols,
          openSymbolsI: i,
        })
      } else {
        temp.push({
          temp: true,
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

  const tempLinkI = getTempElI(temp, '[')
  const tempLink = temp[tempLinkI]

  // if there is temp link
  if (tempLink && isTempLink(tempLink)) {
    const prevTempEl = temp[tempLinkI - 1]
    let tempLinkIShift = 0

    // add '[' to prev el
    if (typeof prevTempEl === 'string') {
      prevTempEl + '['
    } else if (prevTempEl.content) {
      prevTempEl.content[prevTempEl.content?.length]
    } else {
      temp[tempLinkI] = '['
      tempLinkIShift++
    }

    // parse again from next char
    return parseContent(
      content,
      (tempLink.openSymbolsI || 0) + 1,
      temp.slice(0, tempLinkI + tempLinkIShift)
    )
  }

  const parsed: InlineContent[] = getParsed(temp, 0)

  return parsed
}
