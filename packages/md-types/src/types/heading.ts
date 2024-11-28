export type HeadingType = 'heading-1' | 'heading-2' | 'heading-3'

export type HeadingMdElement = {
  type: HeadingType
  content: string[]
}

export const isHeadingType = (
  el: Partial<HeadingMdElement>
): el is HeadingMdElement => {
  if (el.type && el.content) {
    return true
  }

  return false
}
