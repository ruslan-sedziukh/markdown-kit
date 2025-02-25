export type ParsedMarkdown = BlockElement[]

export type Heading = 'heading-1' | 'heading-2' | 'heading-3'

export const isHeading = (type: string): type is Heading => {
  if (type === 'heading-1' || type === 'heading-2' || type === 'heading-3') {
    return true
  }

  return false
}

export type HeadingElement = {
  type: Heading
  content: InlineContent[]
}

export type ParagraphElement = {
  type: 'paragraph'
  content: InlineContent[]
}

// Type for all possible block elements
export type BlockElement = HeadingElement | ParagraphElement

export enum InlineType {
  Bold = 'bold',
  Italic = 'italic',
  Link = 'link',
  Image = 'image',
}

export type BoldElement = {
  type: InlineType.Bold
  content: Exclude<InlineContent, InlineType.Bold>[]
}

export type ItalicElement = {
  type: InlineType.Italic
  content: Exclude<InlineContent, InlineType.Italic>[]
}

export type LinkElement = {
  type: InlineType.Link
  content: Exclude<InlineContent, InlineType.Link>[]
  href: string
}

export type ImageElement = {
  type: InlineType.Image
  alt: string
  src: string
}

// Type for all possible inline elements
export type InlineElement =
  | BoldElement
  | ItalicElement
  | LinkElement
  | ImageElement

export type InlineContent = InlineElement | string

export const isInlineContent = (el: any): el is InlineContent => {
  if (el.type) {
    return true
  }

  return false
}
