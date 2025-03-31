import { Heading } from '@ruslan-sedziukh/md-types'
import { parseContent } from '../parseContent'
import { getHeadingType } from './utils'
import { getId } from '../utils'
import { Configs } from '../types/configs'

export const parseHeading = (heading: string, configs?: Configs): Heading => {
  const [headingType, contentIndex] = getHeadingType(heading)
  const content = parseContent(heading.slice(contentIndex), { configs })

  return {
    type: headingType,
    content,
    id: getId(),
  }
}
