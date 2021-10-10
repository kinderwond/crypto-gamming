/**
 * Generate random string.
 * @param length - Length of result string. By default length is 5.
 * @returns {string} - Result string.
 */
export const generateRandomString = (length = 10) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Text to binary
 *
 * @param {String} input - Text that transform to binary.
 * @returns {string} - Binary string.
 */
export function textToBinary(input) {
  let res = '';
  for (let i = 0; i < input.length; i++) {
    res += input[i].charCodeAt(0).toString(2) + ' ';
  }
  return res;
}

/**
 * Transform binary string to char symbols string.
 *
 * @param {String} binStr - Binary string to transform.
 * @returns {*} - String with familiar symbols.
 */
export function binaryToChar(binStr) {
  if (!binStr) return null;
  return binStr
    .split(' ') //Split string in array of binary chars
    .map((bin) => String.fromCharCode(parseInt(bin, 2))) //Map every binary char to real char
    .join('');
}

/**
 * Extracts error message from server-side error response object
 * @param {object, string} error
 * @returns {string}
 */
export function getErrorMessage(error) {
  if (typeof error === 'object') {
    return (
      (error.response && error.response.data) ||
      (error.response && error.response.message) ||
      error.message ||
      error.errorMessage ||
      error.error
    );
  }
  return error || 'Server error';
}
