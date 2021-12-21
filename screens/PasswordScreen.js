import React, {useState} from 'react';
import {StyleSheet, View , SafeAreaView} from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import { Appbar,TextInput, Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

import { getPasswordFromServer } from '../password/get';


export default function PasswordScreen({navigation}) {
  MultitaskBlur.blur();
  const { colors } = useTheme();
  const [urlInput, setUrlInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
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
          <Appbar.Content title="Home"/>
        </Appbar>
      </SafeAreaView>
      <View>
        <View style= {{paddingVertical:10}}> 
          <TextInput
            underlineColor={colors.text}
            activeUnderlineColor= {colors.text}
            left={<TextInput.Icon name="account"/>}
            label = "Username"
            placeholder = "Enter Your Username"
            style ={styles.text}
          />
          <View style= {{paddingVertical:10}}></View>
          <TextInput
            underlineColor={colors.text}
            activeUnderlineColor= {colors.text}
            left={<TextInput.Icon name="link"/>}
            label = "URL"
            placeholder = "Enter URL"
            style ={styles.text}
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
          Get Password
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
