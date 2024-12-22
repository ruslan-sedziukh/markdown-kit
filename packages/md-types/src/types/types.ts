export type Heading = 'heading-1' | 'heading-2' | 'heading-3'

export type HeadingElement = {
  type: Heading
  content: InlineContent[]
}

// Type for all possible block elements
export type BlockElement = HeadingElement

export type Bold = 'bold'

export type Italic = 'italic'

export type Link = 'link'

export type InlineType = Bold | Italic | Link

export type BoldElement = {
  type: 'bold'
  content: Exclude<InlineContent, Bold>[]
}

export type ItalicElement = {
  type: 'italic'
  content: Exclude<InlineContent, Italic>[]
}

export type LinkElement = {
  type: 'link'
  content: Exclude<InlineContent, Link>[]
}

// Type for all possible inline elements
export type InlineElement = BoldElement | ItalicElement | LinkElement

export type InlineContent = InlineElement | string
