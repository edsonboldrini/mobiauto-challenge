export function checkIfTheFirstLetterIsUppercase(word: string) {
  return /^[A-Z]*$/.test(word[0]);
}