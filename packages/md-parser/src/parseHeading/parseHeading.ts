import { HeadingElement, Heading } from 'md-types'

// returns type of heading and index of content
const getHeadingType = (heading: string): [Heading, number] => {
  let headingLevel = 0
  let i = 0

  while (heading[i] === '#') {
    headingLevel++
    i++
  }

  if (i === 1) {
    return ['heading-1', i + 1]
  } else if (i === 2) {
    return ['heading-2', i + 1]
  }

  return ['heading-3', i + 1]
}

export const parseHeading = (heading: string): HeadingElement => {
  const [headingType, contentIndex] = getHeadingType(heading)
  const content = [heading.slice(contentIndex)]

  return {
    type: headingType,
    content,
  }
}
