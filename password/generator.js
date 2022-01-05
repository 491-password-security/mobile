import '../globals'

const numbers = '0123456789'
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é"


const getCharList = () => {
  let characterList = ''

  if (global.generatorSettings.includeLowercase) {
    characterList = characterList + lowerCaseLetters
  }

  if (global.generatorSettings.includeUppercase) {
    characterList = characterList + upperCaseLetters
  }

  if (global.generatorSettings.includeNumbers) {
    characterList = characterList + numbers
  }

  if (global.generatorSettings.includeSymbols) {
    characterList = characterList + specialCharacters
  }

  return characterList;
}

export const createPassword = () => {
  let password = ''
  const characterList = getCharList();
  const characterListLength = characterList.length

  for (let i = 0; i < global.generatorSettings.passwordLength; i++) {
    const characterIndex = Math.round(Math.random() * characterListLength)
    password = password + characterList.charAt(characterIndex)
  }
  return password
}
