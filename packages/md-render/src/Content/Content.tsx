import React from 'react'
import { InlineContent } from '@ruslan-sedziukh/md-types/dist/md-types'
import Bold from '../Bold'

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

        if (el.type === 'bold') {
          return (
            <Bold>
              <Content content={el.content} />
            </Bold>
          )
        }
      })}
    </>
  )
}

export default Content
