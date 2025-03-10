import { Types } from '@ruslan-sedziukh/md-types'
import { parseContent } from '.'

const id = 'uuid'

jest.mock('../utils', () => ({
  getId: () => id,
}))

describe('parseContent', () => {
  describe('emphasized content', () => {
    it.each([
      {
        text: 'is parsed correctly in case simple text',
        content: 'Heading **one** of two',
        expected: [
          'Heading ',
          {
            type: 'bold',
            content: ['one'],
            id,
          },
          ' of two',
        ],
      },
      {
        text: 'is not parsed when there are only opened symbols',
        content: 'Heading **one',
        expected: ['Heading **one'],
      },
      {
        text: 'is parsed inside another emphasized content',
        content: '*H*eading ***o*ne**',
        expected: [
          {
            type: 'italic',
            content: ['H'],
            id,
          },
          'eading ',
          {
            type: 'bold',
            content: [
              {
                type: 'italic',
                content: ['o'],
                id,
              },
              'ne',
            ],
            id,
          },
        ],
      },
    ])('$text', ({ content, expected }) => {
      expect(parseContent(content)).toEqual(expected)
    })
  })

  describe('link', () => {
    it.each([
      {
        text: 'is parsed in simple text',
        content: 'Look at [this](www.test.com) and be aware',
        expected: [
          'Look at ',
          {
            type: 'link',
            content: ['this'],
            href: 'www.test.com',
            id,
          },
          ' and be aware',
        ],
      },
      {
        text: 'is parsed correctly with emphasized text',
        content: 'Look at [**this**](www.test.com) and be aware',
        expected: [
          'Look at ',
          {
            type: 'link',
            content: [{ type: Types.Bold, content: ['this'], id }],
            href: 'www.test.com',
            id,
          },
          ' and be aware',
        ],
      },
      {
        text: 'is parsed correctly when ** are before',
        content: '**[mini**mum](blabla)',
        expected: [
          '**',
          {
            type: 'link',
            content: ['mini**mum'],
            href: 'blabla',
            id,
          },
        ],
      },
      {
        text: 'is parsed correctly with uncompleted link',
        content: 'this is **[mini**mum**(blabla)**',
        expected: [
          'this is ',
          {
            type: 'bold',
            content: ['[mini'],
            id,
          },
          'mum',
          {
            type: 'bold',
            content: ['(blabla)'],
            id,
          },
        ],
      },
      {
        text: 'is parsed correctly when text has uncompleted and completed link',
        content: 'this is **[mini**mum**(blabla)** [value](test.com)',
        expected: [
          'this is ',
          {
            type: 'bold',
            content: ['[mini'],
            id,
          },
          'mum',
          {
            type: 'bold',
            content: ['(blabla)'],
            id,
          },
          ' ',
          {
            type: 'link',
            content: ['value'],
            href: 'test.com',
            id,
          },
        ],
      },
      {
        text: 'is parsed correctly when text has uncompleted link before',
        content: 'this is **![mini**mum**(blabla)** [cow](test.com)',
        expected: [
          'this is ',
          {
            type: 'bold',
            content: ['![mini'],
            id,
          },
          'mum',
          {
            type: 'bold',
            content: ['(blabla)'],
            id,
          },
          ' ',
          {
            type: Types.Link,
            content: ['cow'],
            href: 'test.com',
            id,
          },
        ],
      },
    ])('$text', ({ content, expected }) => {
      expect(parseContent(content)).toEqual(expected)
    })
  })

  describe('image', () => {
    it.each([
      {
        text: 'is parsed in simple text',
        content: 'Look at ![cow](./assets/cow.png) and be aware',
        expected: [
          'Look at ',
          {
            type: Types.Image,
            alt: 'cow',
            src: './assets/cow.png',
            id,
          },
          ' and be aware',
        ],
      },
      {
        text: 'is parsed in correctly with emphasized text',
        content: 'Look at ![**cow**](./assets/cow.png) and be aware',
        expected: [
          'Look at ',
          {
            type: Types.Image,
            alt: '**cow**',
            src: './assets/cow.png',
            id,
          },
          ' and be aware',
        ],
      },
      {
        text: 'is parsed correctly when ** are before',
        content: '**![mini**mum](./assets/minimum.png)',
        expected: [
          '**',
          {
            type: Types.Image,
            alt: 'mini**mum',
            src: './assets/minimum.png',
            id,
          },
        ],
      },
      {
        text: 'is parsed correctly with uncompleted image',
        content: 'this is **![mini**mum**(./assets/minimum.png)**',
        expected: [
          'this is ',
          {
            type: 'bold',
            content: ['![mini'],
            id,
          },
          'mum',
          {
            type: 'bold',
            content: ['(./assets/minimum.png)'],
            id,
          },
        ],
      },
      {
        text: 'is parsed correctly when text has uncompleted and completed image',
        content: 'this is **![mini**mum**(blabla)** ![cow](./assets/cow.png)',
        expected: [
          'this is ',
          {
            type: 'bold',
            content: ['![mini'],
            id,
          },
          'mum',
          {
            type: 'bold',
            content: ['(blabla)'],
            id,
          },
          ' ',
          {
            type: Types.Image,
            alt: 'cow',
            src: './assets/cow.png',
            id,
          },
        ],
      },
      {
        text: 'is parsed correctly when text has uncompleted link before',
        content: 'this is **[mini**mum**(blabla)** ![cow](./assets/cow.png)',
        expected: [
          'this is ',
          {
            type: 'bold',
            content: ['[mini'],
            id,
          },
          'mum',
          {
            type: 'bold',
            content: ['(blabla)'],
            id,
          },
          ' ',
          {
            type: Types.Image,
            alt: 'cow',
            src: './assets/cow.png',
            id,
          },
        ],
      },
    ])('$text', ({ content, expected }) => {
      expect(parseContent(content)).toEqual(expected)
    })
  })
})
