const fetchJson = <TRet>(
  url: string,

  options: Omit<RequestInit, 'method' | 'body'> & {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body: unknown
  },
) => {
  return new Promise<TRet>((resolve, reject) => {
    fetch(url, {
      ...options,
      body: JSON.stringify(options.body),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          resolve(await res.json())
        } else {
          const { error } = await res.json()
          reject(error)
        }
      })
      .catch((err) => reject(err))
  })
}

type FetchJsonParameters = Parameters<typeof fetchJson>

export const getJson = <TRet>(
  url: FetchJsonParameters[0],
  options: Omit<FetchJsonParameters[1], 'method'>,
) => {
  return fetchJson<TRet>(url, { ...options, method: 'GET' })
}

export const postJson = <TRet>(
  url: FetchJsonParameters[0],
  options: Omit<FetchJsonParameters[1], 'method'>,
) => {
  return fetchJson<TRet>(url, { ...options, method: 'POST' })
}
