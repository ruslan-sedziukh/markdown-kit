import React from 'react'
import { InlineContent, InlineType } from '@ruslan-sedziukh/md-types'
import Bold from '../Bold'
import Italic from '../Italic'
import Link from '../Link'

type Props = {
  content: InlineContent[]
}

const Content = ({ content }: Props) => {
  return (
    <>
      {content.map((el) => {
        if (typeof el === 'string') {
          return el
        }

        if (el.type === InlineType.Bold) {
          return (
            <Bold>
              <Content content={el.content} />
            </Bold>
          )
        }

        if (el.type === InlineType.Italic) {
          return (
            <Italic>
              <Content content={el.content} />
            </Italic>
          )
        }

        if (el.type === InlineType.Link) {
          return (
            <Link href={el.href}>
              <Content content={el.content} />
            </Link>
          )
        }
      })}
    </>
  )
}

export default Content
