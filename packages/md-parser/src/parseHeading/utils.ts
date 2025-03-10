import { HeadingType, Types } from '@ruslan-sedziukh/md-types'

// returns type of heading and index of content
export const getHeadingType = (heading: string): [HeadingType, number] => {
  let headingLevel = 0
  let i = 0

  while (heading[i] === '#') {
    headingLevel++
    i++
  }

  if (i === 1) {
    return [Types.heading1, i + 1]
  } else if (i === 2) {
    return [Types.heading2, i + 1]
  }

  return [Types.heading3, i + 1]
}
