export type ParsedMarkdown = BlockElement[]

export enum Types {
  Heading1 = 'heading-1',
  Heading2 = 'heading-2',
  Heading3 = 'heading-3',
  Paragraph = 'paragraph',
  UnorderedList = 'unordered-list',
  OrderedList = 'ordered-list',
  ListItem = 'list-element',
  Bold = 'bold',
  Italic = 'italic',
  Link = 'link',
  Image = 'image',
}

export type HeadingType = Types.Heading1 | Types.Heading2 | Types.Heading3

export const isHeading = (el: { type: string }): el is Heading => {
  const { type } = el

  if (
    type === Types.Heading1 ||
    type === Types.Heading2 ||
    type === Types.Heading3
  ) {
    return true
  }

  return false
}

export type Heading = {
  type: HeadingType
  content: Content[]
  id: string
}

export type Paragraph = {
  type: Types.Paragraph
  content: Content[]
  id: string
}

export type ListItem = {
  type: Types.ListItem
  content: Content[]
  id: string
}

export type List = {
  type: Types.OrderedList | Types.UnorderedList
  content: ListItem[]
  id: string
}

// Type for all possible block elements
export type BlockElement = Heading | Paragraph | List | ListItem

export type InlineType =
  | Types.Bold
  | Types.Image
  | Types.Italic
  | Types.Link
  | Types.UnorderedList
  | Types.OrderedList
  | Types.ListItem

export type Bold = {
  type: Types.Bold
  content: Exclude<Content, Types.Bold>[]
  id: string
}

export type Italic = {
  type: Types.Italic
  content: Exclude<Content, Types.Italic>[]
  id: string
}

export type Link = {
  type: Types.Link
  content: Exclude<Content, Types.Link>[]
  href: string
  id: string
}

export type Image = {
  type: Types.Image
  alt: string
  src: string
  id: string
}

// Type for all possible content elements
export type ContentElement = Bold | Italic | Link | Image | List | ListItem

export type Content = ContentElement | string

export const isContentElement = (el: any): el is ContentElement => {
  if (el.type) {
    return true
  }

  return false
}
