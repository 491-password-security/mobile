import React, {useState} from 'react';
import {StyleSheet, View , SafeAreaView} from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import { Appbar,TextInput, Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

import { getPasswordFromServer } from '../password/get';

import { useTranslation } from 'react-i18next';
import './constants/i18n';


export default function PasswordScreen({navigation}) {
  MultitaskBlur.blur();
  const { colors } = useTheme();
  const [urlInput, setUrlInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const {t, i18n} = useTranslation();
  //const {massPass} = route.params;
  //const [urlInput, setUrlInput] = useState('');
  //const [userInput, setUserInput] = useState('');

  /*const deneme = async () => {
    // login api call here
    const credentials = await Keychain.getGenericPassword();
    if (!credentials) {
      console.log(
        'Credentials successfully loaded for user ' + credentials.username
      );
    } 
  }*/ 

  return (
    <View useTheme={colors}>
      <SafeAreaView style={{backgroundColor: colors.primary}}>
        <Appbar style={{ backgroundColor: colors.primary }}>  
          <Appbar.Content title={t("Home")}/>
        </Appbar>
      </SafeAreaView>
      <View>
        <View style= {{paddingVertical:10}}> 
          <TextInput
            style ={[styles.text, {backgroundColor: colors.textInput}]}
            underlineColor={colors.text}
            activeUnderlineColor= {colors.text}
            left={<TextInput.Icon name="account"/>}
            label = {t("Username")}
            placeholder = {t("Enter Your Username")}
          />
          <View style= {{paddingVertical:10}}></View>
          <TextInput
            style ={[styles.text, {backgroundColor: colors.textInput}]}
            underlineColor={colors.text}
            activeUnderlineColor= {colors.text}
            left={<TextInput.Icon name="link"/>}
            label = {t("URL")}
            placeholder = {t("Enter URL")}
          />
        </View>
        <View style= {{paddingVertical:40, flexDirection:'row', justifyContent:'space-evenly'}}> 
          <Button
          mode="contained"
          color = {colors.primary}
          onPress={() => {
            getPasswordFromServer("altay", "altay.com")
              .then((pass) => {
                console.log("pass: " + pass);
              })
              .catch((error) => {
                console.log(error);
              })
          }}
          >
          {t("Get Password")}
          </Button>
        </View>
      </View>
    </View>
  );
}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    alignSelf: 'center',
    width: '100%',
    height: 80,
    fontSize: 12,
  }
});
