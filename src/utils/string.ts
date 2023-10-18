export const upperCaseFirstLetter = (str: string) => str.charAt(0).toUpperCase()
export const replaceCharactersInString = (
  str: string,
  search: string,
  replaceWith: string,
) => {
  return str.replaceAll(search, replaceWith)
}
