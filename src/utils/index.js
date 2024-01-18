/**
 * Removes the trailing slash ('/') from a URL if it exists.
 *
 * @param {string} url - The URL from which to remove the trailing slash.
 * @returns {string} The URL without the trailing slash. If the original URL does not end with a slash, it is returned unchanged.
 */
export function removeTrailingSlash(url) {
  if (url.endsWith('/')) {
    return url.slice(0, -1);
  }

  return url;
}

/**
 * Represents a generic signature for an API request function.
 *
 * @param url - The URL to which the request is sent.
 * @param method - The HTTP method to use, such as 'GET' or 'POST'.
 * @param body - The body of the request, typically a JSON object.
 * @param headers - Additional headers for the request.
 * @returns The response from the API as a Promise.
 */
export async function apiRequest(url, method, body, headers) {
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
