import { HeadingMdElement, HeadingType, isHeadingType } from 'md-types'

export const parseHeading = (heading: string): HeadingMdElement | undefined => {
  const lineMdElement: Partial<HeadingMdElement> = {}

  let headingLevel = 0
  let i = 0

  while (heading[i] === '#') {
    headingLevel++
    i++
  }

  lineMdElement.type = `heading-${headingLevel}` as HeadingType

  lineMdElement.content = [heading.slice(i + 1)]

  if (isHeadingType(lineMdElement)) {
    return lineMdElement
  }
}
