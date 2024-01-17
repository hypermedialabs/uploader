/**
 * Represents a generic signature for an API request function.
 *
 * @param url - The URL to which the request is sent.
 * @param method - The HTTP method to use, such as 'GET' or 'POST'.
 * @param body - The body of the request, typically a JSON object.
 * @param headers - Additional headers for the request.
 * @returns The response from the API as a Promise.
 */
export async function apiRequest(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: Record<string, unknown>,
  headers?: Record<string, string>,
): Promise<Response> {
  return fetch(url, {
    method: method,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
