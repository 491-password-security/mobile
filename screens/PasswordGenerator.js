import React, {useState} from 'react';
import { StyleSheet, Text, View , SafeAreaView, Image } from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import { Appbar, Button, Switch, } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import Slider from '@react-native-community/slider';
import Snackbar from 'react-native-snackbar';
import { useTranslation } from 'react-i18next';
import './constants/i18n';

const numbers = '0123456789'
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é"

export default function PasswordGeneratorScreen({navigation}){
  MultitaskBlur.blur();
  const { colors } = useTheme();
  const {t, i18n} = useTranslation();

  const [passwordLength, setPasswordLength] = useState(14)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const getCharList = () => {
    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + numbers
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters
    }

    return characterList;
  }

  const handleGeneratePassword = () => {
    const charList = getCharList();
    setPasswd(createPassword(charList));
  }

  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const [passwd, setPasswd] = useState(createPassword(getCharList()));

  const setOption = (optionFunc, arg) => {
    var n = includeNumbers + includeSymbols + includeUppercase + includeLowercase;
    if(n === 1 && !arg){
      return;
    }
    optionFunc(arg);
    handleGeneratePassword();
  }

  return(
    <View>
      <SafeAreaView style={[styles.safeAreaBar, {backgroundColor: colors.appBarColor}]}>
        <Appbar style={[styles.appBar, {backgroundColor: colors.appBarColor}]}>
          <Appbar.Content title={t("Password Generator")}/>
        </Appbar>
      </SafeAreaView>
      <SafeAreaView>
        <Text style={[styles.randomPassword, {color: colors.text}]}>{passwd}</Text>
        <Button
          mode="contained"
          color={colors.primary} 
          style={styles.button}
          onPress={() => {
            handleGeneratePassword();
          }}
        >
          {t("Regenerate Password")}
        </Button>
        <Button 
          mode="contained" 
          color={colors.primary} 
          style={styles.button}
          onPress={() => {
            Clipboard.setString(passwd);
            Snackbar.dismiss()
            Snackbar.show({text: t("Password Copied to Clipboard"), duration: 800, textColor: colors.text, numberOfLines: 1, backgroundColor: colors.background});
          }}
        >
          {t("Copy Password")}
        </Button>
        <View style={{flexDirection: "row"}}>
          <Text style={{flex:5, alignSelf: 'center', marginLeft: 10, fontSize: 15, fontWeight: 'bold', color: colors.text}}>Length</Text>
          <Text style={{flex:2, alignSelf:'center', color: colors.text}}>{passwordLength}</Text>
          <Slider
            minimumTrackTintColor ={colors.switchColor}
            value={passwordLength}
            style={{flex:14, marginRight: 10}}
            minimumValue={5}
            maximumValue={128}
            onValueChange={(value) => {setOption(setPasswordLength, value)}}
            step={1}
          />
        </View>
        <View style={styles.option}>
          <Text style={[styles.optionText, {color: colors.text}]} color={colors.text}>A-Z</Text>
          <Switch color = {colors.switchColor} style={styles.switch} value={includeUppercase} onValueChange={(value) => {setOption(setIncludeUppercase, value)}}/>
        </View>
        <View style={styles.option}>
          <Text style={[styles.optionText, {color: colors.text}]}>a-z</Text>
          <Switch color = {colors.switchColor} style={styles.switch} value={includeLowercase} onValueChange={(value) => {setOption(setIncludeLowercase, value)}}/>
        </View>
        <View style={styles.option}>
          <Text style={[styles.optionText, {color: colors.text}]}>0-9</Text>
          <Switch color = {colors.switchColor} style={styles.switch} value={includeNumbers} onValueChange={(value) => {setOption(setIncludeNumbers, value)}}/>
        </View>
        <View style={styles.option}>
          <Text style={[styles.optionText, {color: colors.text}]}>!@#$%^&*</Text>
          <Switch color = {colors.switchColor} style={styles.switch} value={includeSymbols} onValueChange={(value) => {setOption(setIncludeSymbols, value)}}/>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  randomPassword:{
    alignSelf: 'center',
    fontSize: 18,
    padding: 8,
    margin: 5,
  },

  button:{
    alignSelf: 'center',
    borderRadius: 8,
    margin: 5,
    width: "85%"
  },

  option:{
    flexDirection:"row",
    alignItems:"flex-end",
    marginTop: 8,
  },

  optionText:{
    flex:1,
    alignSelf: 'center', 
    marginLeft: 10, 
    fontSize: 17, 
    fontWeight: 'bold',
  },

  switch:{
    marginRight: 8,
  },

  appBar: {
    shadowOpacity: 0, 
    elevation: 0,
  },

  safeAreaBar: {
    shadowOpacity: 1,
    elevation: 1,
  },
});