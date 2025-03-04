import { InlineType } from '@ruslan-sedziukh/md-types'
import { parseContent } from '.'

jest.mock('uuid', () => ({
  v4: () => 'uuid',
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
            id: 'uuid',
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
            id: 'uuid',
          },
          'eading ',
          {
            type: 'bold',
            content: [
              {
                type: 'italic',
                content: ['o'],
                id: 'uuid',
              },
              'ne',
            ],
            id: 'uuid',
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
            id: 'uuid',
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
            content: [{ type: InlineType.Bold, content: ['this'], id: 'uuid' }],
            href: 'www.test.com',
            id: 'uuid',
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
            id: 'uuid',
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
            id: 'uuid',
          },
          'mum',
          {
            type: 'bold',
            content: ['(blabla)'],
            id: 'uuid',
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
            id: 'uuid',
          },
          'mum',
          {
            type: 'bold',
            content: ['(blabla)'],
            id: 'uuid',
          },
          ' ',
          {
            type: 'link',
            content: ['value'],
            href: 'test.com',
            id: 'uuid',
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
            id: 'uuid',
          },
          'mum',
          {
            type: 'bold',
            content: ['(blabla)'],
            id: 'uuid',
          },
          ' ',
          {
            type: InlineType.Link,
            content: ['cow'],
            href: 'test.com',
            id: 'uuid',
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
            type: InlineType.Image,
            alt: 'cow',
            src: './assets/cow.png',
            id: 'uuid',
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
            type: InlineType.Image,
            alt: '**cow**',
            src: './assets/cow.png',
            id: 'uuid',
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
            type: InlineType.Image,
            alt: 'mini**mum',
            src: './assets/minimum.png',
            id: 'uuid',
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
            id: 'uuid',
          },
          'mum',
          {
            type: 'bold',
            content: ['(./assets/minimum.png)'],
            id: 'uuid',
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
            id: 'uuid',
          },
          'mum',
          {
            type: 'bold',
            content: ['(blabla)'],
            id: 'uuid',
          },
          ' ',
          {
            type: InlineType.Image,
            alt: 'cow',
            src: './assets/cow.png',
            id: 'uuid',
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
            id: 'uuid',
          },
          'mum',
          {
            type: 'bold',
            content: ['(blabla)'],
            id: 'uuid',
          },
          ' ',
          {
            type: InlineType.Image,
            alt: 'cow',
            src: './assets/cow.png',
            id: 'uuid',
          },
        ],
      },
    ])('$text', ({ content, expected }) => {
      expect(parseContent(content)).toEqual(expected)
    })
  })
})
