import { InlineContent, InlineElement, InlineType } from 'md-types'
import { getTempElData, getParsed, getTempElI, isTempLink, Temp } from './utils'

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
  let parseImage = false

  while (i < content.length) {
    const { elSymbols, elType, tempElI } = getTempElData({
      content,
      i,
      temp,
      parseImage: parseImage,
    })

    if (elType) {
      if (tempElI !== -1) {
        const tempEl = temp[tempElI]

        if (typeof tempEl !== 'string' && tempEl.type === InlineType.Link) {
          // if there was found existed temp link
          if (elSymbols === '[') {
            return reparseAfterUncompletedLink(content, temp)
          }

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

            parseImage = false
          }
        } else if (
          typeof tempEl !== 'string' &&
          tempEl.type === InlineType.Image
        ) {
          // if there was found existed temp link
          if (elSymbols === '![') {
            // TODO: implement logic for reparsing
            // return reparseAfterUncompletedLink(content, temp)
          }

          if (elSymbols === '](') {
            const altText = temp[temp.length - 1]

            temp[tempElI] = {
              ...tempEl,
              alt: typeof altText === 'string' ? altText : '',
            }
          }

          if (elSymbols === ')') {
            temp[tempElI] = {
              alt: tempEl.alt,
              type: tempEl.type,
              src: temp[temp.length - 1] as string,
            }

            parseImage = false
          }
        } else {
          temp[tempElI] = {
            type: elType,
            content: getParsed(temp, tempElI + 1),
          } as InlineElement
        }

        temp = temp.slice(0, tempElI + 1)
      } else if (elSymbols === '[' || elSymbols === '![') {
        temp.push({
          temp: true,
          type: elType,
          openSymbols: elSymbols,
          openSymbolsI: i,
        })

        if (elSymbols === '![') {
          parseImage = true
        }
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

  console.log('temp:', temp)

  return reparseAfterUncompletedLink(content, temp)
}

const reparseAfterUncompletedLink = (
  // content that should be parsed
  content: string,
  // starting temp array
  temp: Temp[]
) => {
  const tempLinkI = getTempElI(temp, '[')
  const tempLink = temp[tempLinkI]

  // if there is temp link
  if (tempLink && isTempLink(tempLink)) {
    const prevTempEl = temp[tempLinkI - 1]
    let tempLinkIShift = 0

    // add '[' to prev el
    if (typeof prevTempEl === 'string') {
      prevTempEl + '['
    } else if ('content' in prevTempEl && prevTempEl.content) {
      prevTempEl.content[prevTempEl.content?.length]
    } else {
      temp[tempLinkI] = '['
      tempLinkIShift++
    }

    // parse again from next char
    return parseContent(
      content,
      tempLink.openSymbolsI + 1,
      temp.slice(0, tempLinkI + tempLinkIShift)
    )
  }

  return getParsed(temp, 0)
}
