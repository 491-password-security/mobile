import React,{ useState, useEffect}  from 'react';
import {StyleSheet, View ,Image} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import MultitaskBlur from "react-native-multitask-blur";
import * as Keychain from "react-native-keychain";
import { useTheme } from '@react-navigation/native';
import { TextInput,Button } from 'react-native-paper';
var crypto = require('crypto-helper-ku');


export default function LoginScreen({navigation,props}) {
  MultitaskBlur.blur();
  const [passInput, setPassInput] = useState('');
  const { colors } = useTheme();
  const [hidePass, setHidePass] = useState(true);



  /*const deneme = async () => {
    // login api call here
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {r
      console.log(
        'Credentials successfully loaded for user ' + credentials.username
      );
    } 
  }*/


  /*  async () => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials)
  navigation.navigate('PasswordScreen');
  }*/

  const handleLogin = async () => {
    // login api call here
    const masterPass = passInput;
    const username = "local";
    const credentials = await Keychain.getGenericPassword();
    if (!credentials){
      await Keychain.setGenericPassword(username, masterPass);
    }
    navigation.navigate('PasswordScreen');
  }

  const showPassword = async () => {
    //if (privacy = )
    privacy = false;
  }


  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  const fallBackToDefaultAuth = () => {
    console.log('fall back to password authentication');
  };

  const alertComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };
  const handleBiometricAuth = async () => {
    // Check if hardware supports biometrics
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    // Fallback to default authentication method (password) if Fingerprint is not available
    if (!isBiometricAvailable)
      return alertComponent(
        'Please enter your password',
        'Biometric Authentication not supported',
        'OK',
        () => fallBackToDefaultAuth()
      );
          // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
    let supportedBiometrics;
    if (isBiometricAvailable)
      supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();

    // Check Biometrics are saved locally in user's device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return alertComponent(
        'Biometric record not found',
        'Please login with your password',
        'OK',
        () => fallBackToDefaultAuth()
      );

    // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)

    const credentials = await Keychain.getGenericPassword();
    if (!credentials) 
      return alertComponent(
        'No Password Saved',
        () => fallBackToDefaultAuth()
      );


    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      cancelLabel: 'Cancel',
      disableDeviceFallback: true,
    });
    // Log the user in on success
    if (biometricAuth) 
    console.log('success');
    masterPass = credentials.masterPass;
    navigation.navigate('PasswordScreen', { name: 'PasswordScreen' });
  };

  
  return (
    <View style={styles.container}>
      <View>
       <Image style={styles.logoimage} source={require('../assets/lock2.png')}       />
        <View style= {{paddingVertical:70}}> 
        <TextInput
        underlineColor={colors.primary}
        activeUnderlineColor= {colors.primary}
        label = "Master Password"
        placeholder = "Please Enter Master Password"
        secureTextEntry={hidePass ? true : false}
        left={<TextInput.Icon name="lock"/>}
        right={<TextInput.Icon name="eye" onPress={() => setHidePass(!hidePass)} />}
        onChangeText={passInput => setPassInput(passInput)}
        defaultValue={passInput}
        style ={styles.text}
       />
        </View >
        <View style= {{paddingVertical:40,flexDirection:'row',justifyContent:'space-evenly'}}> 
        <Button mode="contained" color = {colors.primary} onPress ={handleLogin} >
    Login
  </Button>
        </View>
        <Button mode="contained" color = {colors.primary} onPress ={handleBiometricAuth} >
        Login with Biometrics
  </Button>
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
  image: {
    flex: 1,
    justifyContent: "center",
    width:'100%',
    height:'100%'
  },
  logoimage: {
    
    width:200,
    height:200,
    alignSelf: 'center',
  },
  text: {
    color: "black",
    alignSelf: 'center',
    width:350,
    height:100,
    fontSize: 12,
    fontWeight: "bold",
  },
});
