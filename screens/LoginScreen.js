import React,{ useState, useEffect,Pressable }  from 'react';
import { ImageBackground,Button, StyleSheet, Text, TextInput, View ,Image} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import MultitaskBlur from "react-native-multitask-blur";
import * as Keychain from "react-native-keychain";
import { useTheme } from '@react-navigation/native';
var crypto = require('crypto-helper-ku');
import Icon from 'react-native-vector-icons/FontAwesome';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function LoginScreen({navigation,props}) {
  MultitaskBlur.blur();
  const [passInput, setPassInput] = useState('');
  const { colors } = useTheme();


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
        <View style= {{paddingVertical:100}}> 
        <TextInput
        backgroundColor = {colors.text}
        placeholder = "Please Enter Master Password"
        secureTextEntry={true}
        onChangeText={passInput => setPassInput(passInput)}
        defaultValue={passInput}r
        style ={styles.text}
       />
        </View >
        <View style= {{paddingVertical:20,flexDirection:'row',justifyContent:'space-evenly'}}> 
        <Button color = {colors.primary} title = "Login"  onPress ={handleLogin}   />
        </View>
        <Button color = {colors.primary} title = "Login with Biometrics" onPress ={handleBiometricAuth}  />
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
    borderColor: 'black', 
    alignSelf: 'center',
    borderWidth: 1,
    width:250,
    height:50,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.7
  }
});
