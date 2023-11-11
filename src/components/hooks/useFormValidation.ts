import { useCallback } from 'react'
import { ObjectSchema } from 'yup'
import { getFormData } from '../../utils/form'

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
  const handleChangeAndBlur = useCallback(
    (
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
    },
    [schema, stateSetterFn],
  )

  const handleValidate = useCallback(
    (e: React.FormEvent<HTMLFormElement>, formFields: TSchemaKeys[]) => {
      const form = e.currentTarget

      const validationObject = {} as Record<TSchemaKeys, unknown>
      formFields.forEach((field) => {
        validationObject[field] = form[field].value
      })

      try {
        schema.validateSync(validationObject, {
          abortEarly: false,
        })

        stateSetterFn(createInitialState())
        return true
      } catch (err) {
        const knownError = err as {
          inner: { path: TSchemaKeys; message: string }[]
        }
        const formValidation = knownError.inner.reduce((acc, current) => {
          acc[current.path].isTouched = true
          acc[current.path].errorMessages.push(current.message)
          return acc
        }, createInitialState())

        stateSetterFn(formValidation)
        return false
      }
    },
    [schema, stateSetterFn, createInitialState],
  )

  return {
    handleChangeAndBlur,
    handleValidate,
  }
}

export default useFormValidation
