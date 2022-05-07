/**
   * Converts a base64 string to a dataURL-string.
   * @param {string} base64 The base64 string to convert.
   * @return {string} The resulting dataurl.
   */
export function base64ToDataURL(base64: string): string {
  return `data:image/jpeg;base64,${base64}`;
}

/**
 * If the value is a base64 string, it will be converted to a dataURL-string.
 * @param {string} dataString The string to check.
 * @return {string} The resulting dataurl.
 */
export function parseDataString(dataString: string): string {
  const isDataURL = dataString.indexOf(';base64,') > -1;
  return isDataURL ? dataString : base64ToDataURL(dataString);
}
