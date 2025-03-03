import React from 'react'

type Props = {
  src: string
  alt: string
}

export type ImageType = (props: Props) => React.JSX.Element

const Image = ({ src, alt }: Props) => {
  return <img src={src} alt={alt} />
}

export default Image
