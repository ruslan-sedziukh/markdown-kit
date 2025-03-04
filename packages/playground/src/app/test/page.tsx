import { Markdown } from '@ruslan-sedziukh/md-render'
import { parseMarkdown } from '@ruslan-sedziukh/md-parser'

const Test = () => {
  const parsedMarkdown = parseMarkdown('md-docs/test.md')

  return <Markdown parsedMarkdown={parsedMarkdown} />
}

export default Test
