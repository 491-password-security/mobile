import React,{ useState, useEffect}  from 'react';
import {StyleSheet, View ,Image, SafeAreaView, Alert} from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import * as Keychain from "react-native-keychain";
import { useTheme } from '@react-navigation/native';
import { TextInput,Button,Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTranslation } from 'react-i18next';
import './constants/i18n';

const passedRegex = RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");//Minimum eight characters, at least one letter and one number

const alertComponent = (title, mess, btnText, btnFunc) => {
  return Alert.alert(title, mess, [
    {
      text: btnText,
      onPress: btnFunc,
    },
  ]);
};

//hvuvAS123#$

export default function LoginScreen({navigation, props}) {
  MultitaskBlur.blur();
  const [passInput, setPassInput] = useState('');
  const { colors } = useTheme();
  const [hidePass, setHidePass] = useState(true);

  const {t, i18n} = useTranslation();

  const handleLogin = async () => {
    // login api call here
    if(!passedRegex.test(passInput)){
      return alertComponent(
        t("Invalid Master Password"),
        t("Password must contain Minimum eight characters, at least one lowercase letter, one uppercase letter, one symbol, and one number"),
        t("OK"),
        () => {}
      )
    }
    global.masterPass = passInput;
    setPassInput("");
    navigation.navigate('Home');
  }

  
  const handleBiometricAuth = async () => {
    /*const enabledBiometrics = await AsyncStorage.getItem('EnabledBiometrics');
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
    } */
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <Image style={styles.logoimage} source={require('../assets/vault3.png')} />
      </SafeAreaView>
      <Text style={[styles.name, {color: colors.switchColor}, {paddingVertical:50} ]}>
      VaultRun
      </Text>
        <TextInput
        //selectionColor = {colors.primary}
        style ={[styles.text, {backgroundColor: colors.textInput}, {margin:30}]}
        underlineColor={colors.text}
        activeUnderlineColor= {colors.text}
        label = {t("Master Password")}
        placeholder = {t("Enter Master Password")}
        secureTextEntry={hidePass ? true : false}
        left={<TextInput.Icon name="lock"/>}
        right={<TextInput.Icon name={(hidePass) ? "eye-off" : "eye"} onPress={() => setHidePass(!hidePass)} />}
        onChangeText={input => setPassInput(input)}
        value={passInput}
       />
        <Button mode="contained" color = {colors.primary} margin = {30} onPress ={handleLogin} >
        {t("Login")}
        </Button>
        <Button mode="contained" color = {colors.primary} onPress ={handleBiometricAuth} >
       {t("Login with Biometrics")}
      </Button>
     
    </View>
  );
}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center"
  },

  logoimage: {
    //flex: 1,
    width: 200,
    height: 200,
   //alignSelf: 'center',
  },

  text: {
    color: "black",
    alignSelf: 'center',
    width: '100%',
    height: 80,
    fontSize: 12,
    fontWeight: "bold",
    //paddingBottom:50,
  },

  name: {
    alignSelf: 'center',
    justifyContent: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});
