import React from 'react'
import { InlineContent, InlineType } from '@ruslan-sedziukh/md-types'
import Bold from '../Bold'
import Italic from '../Italic'
import Link from '../Link'
import Image from '../Image'
import { Components } from '../Markdown/types'

type Props = {
  content: InlineContent[]
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
            <Bold key={JSON.stringify(el.content)}>
              <Content content={el.content} components={components} />
            </Bold>
          )
        }

        if (el.type === InlineType.Italic) {
          return (
            <Italic key={JSON.stringify(el.content)}>
              <Content content={el.content} components={components} />
            </Italic>
          )
        }

        if (el.type === InlineType.Link) {
          return (
            <Link href={el.href} key={JSON.stringify(el.href)}>
              <Content content={el.content} components={components} />
            </Link>
          )
        }

        if (el.type === InlineType.Image) {
          if (components?.img) {
            const ImageComponent = components.img

            return (
              <ImageComponent
                key={JSON.stringify(el.src)}
                src={el.src}
                alt={el.alt}
              />
            )
          }

          return (
            <Image key={JSON.stringify(el.src)} src={el.src} alt={el.alt} />
          )
        }
      })}
    </>
  )
}

export default Content
