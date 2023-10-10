export const postJson = (
  url: string,
  body: Record<string, unknown>,
  headers: HeadersInit = {},
) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
}
