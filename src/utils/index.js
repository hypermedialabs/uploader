export async function apiRequestExternal(url, method = 'GET', body, headers) {
    return fetch(url, {
      method: method,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  }