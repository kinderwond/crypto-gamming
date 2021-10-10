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
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}


export function textToBinary(input) {
  let res = ""
  for (let i = 0; i < input.length; i++) {
    res += input[i].charCodeAt(0).toString(2) + " ";
  }
  return res
}
export function binaryToChar(binStr) {
  return binStr.split(' ') //Split string in array of binary chars
    .map(bin => String.fromCharCode(parseInt(bin, 2))) //Map every binary char to real char
    .join('')
}