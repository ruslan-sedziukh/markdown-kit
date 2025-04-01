import fs from 'fs'
import { parseMarkdown } from '../parseMarkdown'
import { Configs } from '../types/configs'

export const parseMarkdownFile = (documentPath: string, configs?: Configs) => {
  try {
    const data = fs.readFileSync(documentPath, 'utf8')

    return parseMarkdown(data, configs)
  } catch (err) {
    throw err
  }
}
