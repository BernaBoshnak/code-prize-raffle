export const generateRandomCodes = (codeCountStr, codeLengthStr) => {
  if ([codeCountStr, codeLengthStr].includes(undefined)) {
    throw new Error('Missing arguments!')
  }

  const codeCount = Number(codeCountStr)
  const codeLength = Number(codeLengthStr)

  const uppercaseLetters = [...Array(26)].map((_, i) => {
    return String.fromCharCode(i + 65)
  })
  const numbers = [...Array(10)].map((_, i) => i.toString())
  const characters = [...uppercaseLetters, ...numbers].join('')

  const getCode = () => {
    return [...Array(codeLength)]
      .map(() => {
        const randomIndex = Math.floor(Math.random() * characters.length)
        return characters.charAt(randomIndex)
      })
      .join('')
  }

  const codes = [...Array(codeCount)].reduce((acc) => {
    let code = getCode()
    while (acc.includes(code)) {
      code = getCode()
    }

    acc.push(code)

    return acc
  }, [])

  return codes
}
