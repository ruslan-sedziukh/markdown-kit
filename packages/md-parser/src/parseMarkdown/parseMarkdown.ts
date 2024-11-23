import fs from 'fs'

export const parseMarkdown = (documentPath: string) => {
  try {
    const data = fs.readFileSync(documentPath, 'utf8')

    const lines = data.split('\n')

    return lines
  } catch (err) {
    throw err
  }
}
