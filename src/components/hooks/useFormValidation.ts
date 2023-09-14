import { getFormData } from '../../utils/form'
import { ObjectSchema } from 'yup'

function useFormValidation<
  const TSchemaKeys extends string,
  const TInitialState extends Record<
    TSchemaKeys,
    { isTouched: boolean; errorMessages: string[] }
  >,
>(
  schema: ObjectSchema<Record<TSchemaKeys, unknown>>,
  stateSetterFn: React.Dispatch<React.SetStateAction<TInitialState>>,
  createInitialState: () => TInitialState,
) {
  const handleChangeAndBlur = (
    e: React.FocusEvent | React.ChangeEvent,
    namesToValidate?: Array<TSchemaKeys>,
  ) => {
    const target = e.currentTarget as EventTarget & HTMLInputElement
    const form = target.form

    if (!form) {
      return
    }

    const formData = getFormData<TSchemaKeys>(form)

    const targetsToValidate = [target]
    if (namesToValidate) {
      targetsToValidate.push(...namesToValidate.map((name) => form[name]))
    }

    targetsToValidate.forEach(({ name }) => {
      schema
        .validateAt(name, formData, { abortEarly: false })
        .then(() => {
          stateSetterFn((prevState) => ({
            ...prevState,
            [name]: {
              isTouched: false,
              errorMessages: [],
            },
          }))
        })
        .catch((err) => {
          stateSetterFn((prevState) => ({
            ...prevState,
            [name]: {
              isTouched: true,
              errorMessages: err.errors,
            },
          }))
        })
    })
  }

  const handleSubmit = (e: React.FormEvent, formFields: TSchemaKeys[]) => {
    e.preventDefault()
    const form = e.currentTarget as EventTarget & HTMLFormElement

    const validationObject = {} as Record<TSchemaKeys, unknown>
    formFields.forEach((field) => {
      validationObject[field] = form[field].value
    })

    schema
      .validate(validationObject, { abortEarly: false })
      .then(() => {
        stateSetterFn(createInitialState())
      })
      .catch((err: { inner: { path: TSchemaKeys; message: string }[] }) => {
        const formValidation = err.inner.reduce((acc, current) => {
          acc[current.path].isTouched = true
          acc[current.path].errorMessages.push(current.message)
          return acc
        }, createInitialState())

        stateSetterFn(formValidation)
      })
  }

  return {
    handleChangeAndBlur,
    handleSubmit,
  }
}

export default useFormValidation
