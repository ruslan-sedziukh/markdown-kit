import { InlineType } from 'md-types'
import { getParsed, Temp } from './utils'

const temp: Temp[] = [
  'this is ',
  {
    temp: true,
    type: InlineType.Bold,
    openSymbols: '**',
  },
  {
    temp: true,
    type: InlineType.Image,
    openSymbols: '![',
    openSymbolsI: 10,
  },
  'mini**mum**(./assets/minimum.png)**',
]

const expected = [
  'this is ',
  {
    type: 'bold',
    content: ['[mini'],
  },
  'mum',
  {
    type: 'bold',
    content: ['(./assets/minimum.png)'],
  },
]

describe('utils', () => {
  describe('getParsed', () => {
    it('returns correct data for', () => {
      expect(getParsed(temp, 0)).toBe(expected)
    })
  })
})
