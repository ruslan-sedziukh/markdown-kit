import React from 'react'
import { Content, Types } from '@ruslan-sedziukh/md-types'
import Bold from '../Bold'
import Italic from '../Italic'
import Link from '../Link'
import Image from '../Image'
import { Components } from '../Markdown/types'
import List from '../List'
import ListItem from '../ListItem'

type Props = {
  content: Content[]
  components?: Components
}

const Content = ({ content, components }: Props) => {
  return (
    <>
      {content.map((el) => {
        if (typeof el === 'string') {
          return el
        }

        if (el.type === Types.Bold) {
          return (
            <Bold key={el.id}>
              <Content content={el.content} components={components} />
            </Bold>
          )
        }

        if (el.type === Types.Italic) {
          return (
            <Italic key={el.id}>
              <Content content={el.content} components={components} />
            </Italic>
          )
        }

        if (el.type === Types.Link) {
          return (
            <Link href={el.href} key={el.id}>
              <Content content={el.content} components={components} />
            </Link>
          )
        }

        if (el.type === Types.Image) {
          if (components?.img) {
            const ImageComponent = components.img

            return <ImageComponent key={el.id} src={el.src} alt={el.alt} />
          }

          return <Image key={el.id} src={el.src} alt={el.alt} />
        }

        if (el.type === Types.UnorderedList) {
          return (
            <List key={el.id}>
              <Content content={el.content} components={components} />
            </List>
          )
        }

        if (el.type === Types.ListItem) {
          return (
            <ListItem key={el.id}>
              <Content content={el.content} components={components} />
            </ListItem>
          )
        }
      })}
    </>
  )
}

export default Content
