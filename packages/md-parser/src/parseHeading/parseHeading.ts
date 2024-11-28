import { HeadingMdElement, HeadingType } from 'md-types'

const getHeadingType = (heading: string): [HeadingType, number] => {
  let headingLevel = 0
  let i = 0

  while (heading[i] === '#') {
    headingLevel++
    i++
  }

  if (i === 1) {
    return ['heading-1', i]
  } else if (i === 2) {
    return ['heading-2', i]
  }

  return ['heading-3', i]
}

export const parseHeading = (heading: string): HeadingMdElement | undefined => {
  const [headingType, i] = getHeadingType(heading)
  const content = [heading.slice(i + 1)]

  return {
    type: headingType,
    content,
  }
}
