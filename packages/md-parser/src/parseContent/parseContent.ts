import { InlineContent, InlineElement, InlineType } from 'md-types'
import {
  getTempElData,
  getParsed,
  getTempElI,
  isTempLink,
  Temp,
  isTempImage,
} from './utils/utils'

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
    const { elSymbols, elType, tempElI, reparseImage, reparseLink } =
      getTempElData({
        content,
        i,
        temp,
        parseImage: parseImage,
      })

    if (reparseLink) {
      return reparseAfterUncompletedElement(content, temp, InlineType.Link)
    }

    if (reparseImage) {
      return reparseAfterUncompletedElement(content, temp, InlineType.Image)
    }

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

  const tempLink = temp.find((el) => {
    if (typeof el !== 'object') {
      return false
    }

    if (el.type === InlineType.Link && !el.href) {
      return true
    }
  })

  const tempImage = temp.find((el) => {
    if (typeof el !== 'object') {
      return false
    }

    if (el.type === InlineType.Image && !el.src) {
      return true
    }
  })

  if (tempImage) {
    return reparseAfterUncompletedElement(content, temp, InlineType.Image)
  }

  if (tempLink) {
    return reparseAfterUncompletedElement(content, temp, InlineType.Link)
  }

  return getParsed(temp, 0)
}

const reparseAfterUncompletedElement = (
  // content that should be parsed
  content: string,
  // starting temp array
  temp: Temp[],
  // temp element type
  type: InlineType.Image | InlineType.Link
) => {
  let openSymbols = ''

  if (type === InlineType.Image) {
    openSymbols = '!['
  } else if (type === InlineType.Link) {
    openSymbols = '['
  }

  const tempElI = getTempElI(temp, openSymbols)
  const tempEl = temp[tempElI]

  // if there is temp link
  if (tempEl && (isTempImage(tempEl) || isTempLink(tempEl))) {
    const prevTempEl = temp[tempElI - 1]
    let tempImageIShift = 0

    // add open symbols to prev el
    if (typeof prevTempEl === 'string') {
      prevTempEl + openSymbols
    } else if ('content' in prevTempEl && prevTempEl.content) {
      prevTempEl.content[prevTempEl.content?.length]
    } else {
      temp[tempElI] = openSymbols
      tempImageIShift = tempImageIShift + 1
    }

    // parse again from next char
    return parseContent(
      content,
      tempEl.openSymbolsI + openSymbols.length,
      temp.slice(0, tempElI + tempImageIShift)
    )
  }

  return getParsed(temp, 0)
}
