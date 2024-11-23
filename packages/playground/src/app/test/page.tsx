import { renderMarkdown } from 'markdown-render'
import { parseMarkdown } from 'markdown-parser'

const Test = () => {
  console.log('markdown:', parseMarkdown())

  return <div>{renderMarkdown()}</div>
}

export default Test
