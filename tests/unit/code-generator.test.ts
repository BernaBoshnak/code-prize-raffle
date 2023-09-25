import { describe, it, expect } from 'vitest'
import { generateRandomCodes } from '../../scripts/code-generator/code-generator'

describe('code generator', () => {
  it('throws error when no arguments are provided', () => {
    expect(generateRandomCodes).toThrowError('Missing arguments!')
  })

  it('returns an array', () => {
    expect(Array.isArray(generateRandomCodes(1, 1))).toBe(true)
  })

  it('returns an array of provided number of codes', () => {
    const codeCount = 2
    const codes = generateRandomCodes(codeCount, 1)
    expect(codes).toHaveLength(codeCount)
  })

  it('returns an array of code(s) with provided length', () => {
    const codeLength = 6
    const codes = generateRandomCodes(5, codeLength)
    expect(codes.every((code: string) => code.length === codeLength)).toBe(true)
  })

  it('returns an array of unique codes', () => {
    const totalNumberOfLetters = 26
    const totalNumberOfDigits = 10
    const totalNumberOfLettersAndNumbers =
      totalNumberOfLetters + totalNumberOfDigits
    const codesCount = new Set(
      generateRandomCodes(totalNumberOfLettersAndNumbers, 1),
    )
    expect(codesCount.size).toEqual(totalNumberOfLettersAndNumbers)
  })
})
