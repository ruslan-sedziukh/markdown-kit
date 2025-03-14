import { Heading } from '@ruslan-sedziukh/md-types'
import { parseContent } from '../parseContent'
import { getHeadingType } from './utils'
import { getId } from '../utils'

export const parseHeading = (heading: string): Heading => {
  const [headingType, contentIndex] = getHeadingType(heading)
  const content = parseContent(heading.slice(contentIndex))

  return {
    type: headingType,
    content,
    id: getId(),
  }
}
