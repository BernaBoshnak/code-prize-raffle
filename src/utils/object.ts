export const keys = <T extends string>(obj: Partial<Record<T, unknown>>) => {
  return Object.keys(obj) as T[]
}
