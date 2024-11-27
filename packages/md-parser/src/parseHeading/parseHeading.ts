type HeadingType = 'heading-1' | 'heading-2' | 'heading-3'

type HeadingMdElement = {
  type: HeadingType
  content: string[]
}

const isHeadingType = (
  el: Partial<HeadingMdElement>
): el is HeadingMdElement => {
  if (el.type && el.content) {
    return true
  }

  return false
}

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
