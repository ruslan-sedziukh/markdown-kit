import { parseMarkdownFile } from '@ruslan-sedziukh/md-parser'
import { Markdown } from '@ruslan-sedziukh/md-render'

export default function Home() {
  const parsedMarkdown = parseMarkdownFile(
    './public/md-documents/example/example.md',
    {
      assetsPrePath: 'md-documents/example',
    }
  )

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <Markdown parsedMarkdown={parsedMarkdown} />
      </div>
    </div>
  )
}

// const Image: ImageType = ({ src, alt }) => {
//   return (
//     <p>
//       here should be image with src: {src} and alt: {alt}
//     </p>
//   )
// }
