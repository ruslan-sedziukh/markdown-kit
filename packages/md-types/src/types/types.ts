export type Heading = 'heading-1' | 'heading-2' | 'heading-3'

export type HeadingElement = {
  type: Heading
  content: InlineContent[]
}

// Type for all possible block elements
export type BlockElement = HeadingElement

export type Bold = 'bold'

export type Italic = 'italic'

// Type for all possible inline elements
export type InlineContent = BoldElement | ItalicElement | string

export type InlineElement = BoldElement | ItalicElement

export type InlineType = Bold | Italic

export type BoldElement = {
  type: 'bold'
  content: Exclude<InlineContent, Bold>[]
}

export type ItalicElement = {
  type: 'italic'
  content: Exclude<InlineContent, Italic>[]
}
