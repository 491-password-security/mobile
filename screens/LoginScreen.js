import React,{ useState, useEffect}  from 'react';
import {StyleSheet, View ,Image, SafeAreaView, Alert} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import MultitaskBlur from "react-native-multitask-blur";
import * as Keychain from "react-native-keychain";
import { useTheme } from '@react-navigation/native';
import { TextInput,Button,Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTranslation } from 'react-i18next';
import './constants/i18n';

const alertComponent = (title, mess, btnText, btnFunc) => {
  return Alert.alert(title, mess, [
    {
      text: btnText,
      onPress: btnFunc,
    },
  ]);
};

export default function LoginScreen({navigation, props}) {
  MultitaskBlur.blur();
  const [passInput, setPassInput] = useState('');
  const { colors } = useTheme();
  const [hidePass, setHidePass] = useState(true);

  const {t, i18n} = useTranslation();

  const handleLogin = async () => {
    // login api call here
    global.masterPass = passInput;
    navigation.navigate('Home');
  }

  
  const handleBiometricAuth = async () => {
    const enabledBiometrics = await AsyncStorage.getItem('EnabledBiometrics');
    if(!enabledBiometrics){
      //console.log("not enabled");
      return alertComponent('Biometric Login isn\'t Enabled', 'Enable biometric login from app settings', 'OK', () => {});
      
    }

    // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      cancelLabel: 'Cancel',
      disableDeviceFallback: true,
    });

    // Log the user in on success
    if (biometricAuth){
      const credentials = await Keychain.getGenericPassword();
      console.log('success');
      global.masterPass = credentials.masterPass;
      navigation.navigate('PasswordScreen', { name: 'PasswordScreen' });
    } 
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <View style={{ flex: 2}} > 
      <Image style={styles.logoimage} source={require('../assets/vault3.png')} />
      <View style= {{paddingVertical:20}}/> 
      <Text style={[styles.name, {color: colors.switchColor}]}>
      VaultRun
      </Text>
     
      </View>
      <View style={{ flex: 1}} > 
      
        <TextInput
        //selectionColor = {colors.primary}
        style ={[styles.text, {backgroundColor: colors.textInput}]}
        underlineColor={colors.text}
        activeUnderlineColor= {colors.text}
        label = {t("Master Password")}
        placeholder = {t("Enter Master Password")}
        secureTextEntry={hidePass ? true : false}
        left={<TextInput.Icon name="lock"/>}
        right={<TextInput.Icon name="eye" onPress={() => setHidePass(!hidePass)} />}
        onChangeText={passInput => setPassInput(passInput)}
        defaultValue={passInput}
       />
       </View>
       <View style={{ flex: 1}} > 
        <Button mode="contained" color = {colors.primary} onPress ={handleLogin} >
        {t("Login")}
        </Button>
        <View style= {{paddingVertical:10}}/> 
        <Button mode="contained" color = {colors.primary} onPress ={handleBiometricAuth} >
       {t("Login with Biometrics")}
      </Button>
      </View>
      </SafeAreaView>
    </View>
  );
}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  logoimage: {
    //flex: 1,
    width: '100%',
    height: '60%',
    alignSelf: 'center',
  },

  text: {
    color: "black",
    alignSelf: 'center',
    width: '150%',
    height: 80,
    fontSize: 12,
    fontWeight: "bold",
  },

  name: {
    alignSelf: 'center',
    justifyContent: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});
