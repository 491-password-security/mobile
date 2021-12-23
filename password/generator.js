const numbers = '0123456789'
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é"


const getCharList = () => {
    let characterList = ''

    if (randIncludeLowerCase) {
      characterList = characterList + lowerCaseLetters
    }

    if (randIncludeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (randIncludeNumber) {
      characterList = characterList + numbers
    }

    if (randIncludeSymbol) {
      characterList = characterList + specialCharacters
    }

    return characterList;
  }

  export const createPassword = () => {
    let password = ''
    const characterList = getCharList();
    const characterListLength = characterList.length

    for (let i = 0; i < randPasswordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }
