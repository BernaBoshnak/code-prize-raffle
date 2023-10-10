import {
  replaceCharactersInString,
  upperCaseFirstLetter,
} from '../../utils/string'

export const formatErrorMessage = (errorMessage: string) => {
  const errorMessageLower = errorMessage.toLowerCase()
  const formattedMessage =
    upperCaseFirstLetter(errorMessageLower) +
    replaceCharactersInString(errorMessageLower.slice(1), '_', ' ')

  return formattedMessage
}
