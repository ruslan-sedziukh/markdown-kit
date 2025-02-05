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
      return reparseAfterUncompletedLink(content, temp)
    }

    if (reparseImage) {
      console.log('parseImage')
      return reparseAfterUncompletedImage(content, temp)
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

  console.log('temp:', temp)

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

  console.log('>>> tempImage:', tempImage)
  console.log('>>> tempLink:', tempLink)

  if (tempImage) {
    return reparseAfterUncompletedImage(content, temp)
  }

  if (tempLink) {
    return reparseAfterUncompletedLink(content, temp)
  }

  return getParsed(temp, 0)
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

const reparseAfterUncompletedImage = (
  // content that should be parsed
  content: string,
  // starting temp array
  temp: Temp[]
) => {
  const tempImageI = getTempElI(temp, '![')
  const tempImage = temp[tempImageI]

  // if there is temp link
  if (tempImage && isTempImage(tempImage)) {
    const prevTempEl = temp[tempImageI - 1]
    let tempImageIShift = 0

    // add '[' to prev el
    if (typeof prevTempEl === 'string') {
      prevTempEl + '!['
    } else if ('content' in prevTempEl && prevTempEl.content) {
      prevTempEl.content[prevTempEl.content?.length]
    } else {
      temp[tempImageI] = '!['
      tempImageIShift = tempImageIShift + 2
    }

    // parse again from next char
    return parseContent(
      content,
      tempImage.openSymbolsI + 2,
      temp.slice(0, tempImageI + tempImageIShift)
    )
  }

  return getParsed(temp, 0)
}
