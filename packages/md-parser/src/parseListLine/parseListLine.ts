import {
  List,
  ListItem,
  ParsedMarkdown,
  Types,
} from '@ruslan-sedziukh/md-types'
import { getId } from '../utils'
import { parseContent } from '../parseContent'
import { Configs } from '../types/configs'

/**
 * Parse list line. Add parsed representation of the line to a previous list if it exists or creates new one. That is why it mutates `parsedMarkdown` instead of returning something.
 *
 * @param line - line of markdown
 * @param parsedMarkdown - array of parsed elements
 */
export const parseListLine = (
  line: string,
  parsedMarkdown: ParsedMarkdown,
  configs?: Configs
): void => {
  const lastElement = parsedMarkdown[parsedMarkdown.length - 1]

  if (lastElement?.type === Types.UnorderedList) {
    const itemNestingLevel = getItemNestingLevel(line)
    const listNestedListMainListItem = getNestedListMainListItem(
      lastElement,
      itemNestingLevel
    )

    if (!listNestedListMainListItem) {
      lastElement.content.push({
        type: Types.ListItem,
        content: parseContent(getContentLine(line), { configs }),
        id: getId(),
      })
    } else {
      appendListItem(listNestedListMainListItem, {
        type: Types.ListItem,
        content: parseContent(getContentLine(line), { configs }),
        id: getId(),
      })
    }
  } else {
    parsedMarkdown.push({
      type: Types.UnorderedList,
      content: [
        {
          type: Types.ListItem,
          content: parseContent(getContentLine(line), { configs }),
          id: getId(),
        },
      ],
      id: getId(),
    })
  }
}

/**
 * Cleans line from spaces and list open character.
 *
 * @param line
 * @returns line without whitespaces and list open character (`-`)
 */
const getContentLine = (line: string) => {
  return line.trim().slice(2)
}

/**
 * Calculates item nesting level.
 *
 * @param line
 * @returns item level
 */
const getItemNestingLevel = (line: string) => {
  let spaces = 0

  const lineChars = line.split('')

  for (let i = 0; i < lineChars.length; i++) {
    if (line[i] === ' ') {
      spaces++
    } else {
      break
    }
  }

  return Math.floor(spaces / 2)
}

/**
 * Get element to which list item should be appended considering its nesting level.
 *
 * @param list - the list where there can be other nested lists with different nesting levels
 * @param itemLevel - nesting level of the item that should be appended
 * @returns - a list item to which new item should be appended, or null if it should be appended to the root list
 */
const getNestedListMainListItem = (
  list: List,
  itemLevel: number
): ListItem | null => {
  if (itemLevel === 0) {
    return null
  }

  let currentLastListItem = list.content[list.content.length - 1]

  for (let i = 1; i < itemLevel; i++) {
    const nestedList =
      currentLastListItem.content[currentLastListItem.content.length - 1]

    if (
      typeof nestedList !== 'string' &&
      nestedList.type === Types.UnorderedList
    ) {
      currentLastListItem = nestedList.content[nestedList.content.length - 1]
    }
  }

  return currentLastListItem
}

const appendListItem = (
  listLevelMainListItem: ListItem,
  listItem: ListItem
) => {
  const mainListItemLength = listLevelMainListItem.content.length
  const lastContentElement =
    listLevelMainListItem.content[mainListItemLength - 1]

  if (
    typeof lastContentElement === 'string' ||
    lastContentElement.type !== Types.UnorderedList
  ) {
    listLevelMainListItem.content.push({
      type: Types.UnorderedList,
      content: [listItem],
      id: getId(),
    })
  } else {
    lastContentElement.content.push(listItem)
  }
}
