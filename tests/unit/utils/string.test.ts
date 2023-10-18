import { describe, it, expect } from 'vitest'
import {
  upperCaseFirstLetter,
  replaceCharactersInString,
} from '../../../src/utils/string'

describe('"string" utils', () => {
  describe('upperCaseFirstLetter', () => {
    it('makes the first letter uppercase', () => {
      expect(upperCaseFirstLetter('hello')).toBe('H')
    })
  })

  describe('replaceCharactersInString', () => {
    it('replaces character in a string with given string', () => {
      expect(replaceCharactersInString('test', 't', 's')).toBe('sess')
    })
  })
})
