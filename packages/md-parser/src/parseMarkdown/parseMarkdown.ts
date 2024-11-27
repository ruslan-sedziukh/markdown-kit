import fs from 'fs'
import { parseMarkdownString } from '../parseMarkdownString'

export const parseMarkdown = (documentPath: string) => {
  try {
    const data = fs.readFileSync(documentPath, 'utf8')

    return parseMarkdownString(data)
  } catch (err) {
    throw err
  }
}
