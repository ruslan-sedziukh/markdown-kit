import { renderMarkdown } from 'md-render'
import { parseMarkdown } from 'md-parser'

const Test = () => {
  console.log('markdown:', parseMarkdown())

  return <div>{renderMarkdown()}</div>
}

export default Test
