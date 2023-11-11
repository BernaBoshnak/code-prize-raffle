import { describe, expect, it } from 'vitest'
import {
  replaceCharactersInString,
  upperCaseFirstLetter,
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
