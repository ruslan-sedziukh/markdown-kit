export type ParsedMarkdown = BlockElement[]

export enum Types {
  heading1 = 'heading-1',
  heading2 = 'heading-2',
  heading3 = 'heading-3',
  paragraph = 'paragraph',
  list = 'list',
  listElement = 'list-element',
}

export type HeadingType = Types.heading1 | Types.heading2 | Types.heading3

export const isHeading = (el: { type: string }): el is Heading => {
  const { type } = el

  if (
    type === Types.heading1 ||
    type === Types.heading2 ||
    type === Types.heading3
  ) {
    return true
  }

  return false
}

export type Heading = {
  type: HeadingType
  content: InlineContent[]
  id: string
}

export type Paragraph = {
  type: Types.paragraph
  content: InlineContent[]
  id: string
}

export type ListItem = {
  type: Types.listElement
  content: (List | InlineContent)[]
  id: string
}

export type List = {
  type: Types.list
  content: ListItem[]
  id: string
}

// Type for all possible block elements
export type BlockElement = Heading | Paragraph | List | ListItem

export enum InlineType {
  Bold = 'bold',
  Italic = 'italic',
  Link = 'link',
  Image = 'image',
}

export type Bold = {
  type: InlineType.Bold
  content: Exclude<InlineContent, InlineType.Bold>[]
  id: string
}

export type Italic = {
  type: InlineType.Italic
  content: Exclude<InlineContent, InlineType.Italic>[]
  id: string
}

export type Link = {
  type: InlineType.Link
  content: Exclude<InlineContent, InlineType.Link>[]
  href: string
  id: string
}

export type Image = {
  type: InlineType.Image
  alt: string
  src: string
  id: string
}

// Type for all possible inline elements
export type InlineElement = Bold | Italic | Link | Image

export type InlineContent = InlineElement | string

export const isInlineContent = (el: any): el is InlineContent => {
  if (el.type) {
    return true
  }

  return false
}
