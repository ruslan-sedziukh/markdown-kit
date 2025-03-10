import React from 'react'
import {
  InlineContent,
  InlineType,
  ListItem,
  List,
} from '@ruslan-sedziukh/md-types'
import Bold from '../Bold'
import Italic from '../Italic'
import Link from '../Link'
import Image from '../Image'
import { Components } from '../Markdown/types'

type Props = {
  content: (InlineContent | List | ListItem)[]
  components?: Components
}

const Content = ({ content, components }: Props) => {
  return (
    <>
      {content.map((el) => {
        if (typeof el === 'string') {
          return el
        }

        if (el.type === InlineType.Bold) {
          return (
            <Bold key={el.id}>
              <Content content={el.content} components={components} />
            </Bold>
          )
        }

        if (el.type === InlineType.Italic) {
          return (
            <Italic key={el.id}>
              <Content content={el.content} components={components} />
            </Italic>
          )
        }

        if (el.type === InlineType.Link) {
          return (
            <Link href={el.href} key={el.id}>
              <Content content={el.content} components={components} />
            </Link>
          )
        }

        if (el.type === InlineType.Image) {
          if (components?.img) {
            const ImageComponent = components.img

            return <ImageComponent key={el.id} src={el.src} alt={el.alt} />
          }

          return <Image key={el.id} src={el.src} alt={el.alt} />
        }
      })}
    </>
  )
}

export default Content
