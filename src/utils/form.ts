export const getFormData = <TKey extends string>(form: HTMLFormElement) => {
  const formData = {} as Record<TKey, FormDataEntryValue>

  for (const [key, value] of new FormData(form)) {
    formData[key as TKey] = value
  }

  return formData
}
