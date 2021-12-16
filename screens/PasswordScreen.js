import React from 'react';
import {StyleSheet, Text, View ,Image} from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import { Appbar,TextInput, Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';



export default function PasswordScreen({navigation}) {
  MultitaskBlur.blur();
  const { colors } = useTheme();

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
    <View style={styles.container}>
        <Appbar style={styles.topBar}>  
      <Appbar.BackAction style={styles.appIcon} onPress={() => navigation.navigate('LoginScreen', { name: 'LoginScreen' })} />
      <Appbar.Content title="Home"/>
      <Appbar.Action style={styles.appIconSettings} icon="cog" onPress={() => navigation.navigate('Settings', { name: 'Settings' })} />
      </Appbar>
      <View>
        <View style= {{paddingHorizontal:80}}> 
        <TextInput
        underlineColor={colors.primary}
        activeUnderlineColor= {colors.primary}
        left={<TextInput.Icon name="account"/>}
        label = "Username"
        placeholder = "Please Enter Your Username"
        style ={styles.text}
       />
        <View style= {{paddingVertical:5}}></View>
        <TextInput
        underlineColor={colors.primary}
        activeUnderlineColor= {colors.primary}
        left={<TextInput.Icon name="link"/>}
        label = "URL"
        placeholder = "Please Enter URL"
        style ={styles.text}
       />
        </View >
        <View style= {{paddingVertical:40,flexDirection:'row',justifyContent:'space-evenly'}}> 
        <Button mode="contained" color = {colors.primary} >
    Get Password
  </Button>
        </View>
      </View>
    </View>
  );
}
    
const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'rgb(39, 59, 122)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height:100
  },
  appIcon: {
    position: 'absolute',
    left: 20,
    top: 50
  },
  appIconSettings: {
    position: 'absolute',
    right: 20,
    top: 50
  },
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
    
    width:400,
    height:400,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    width:350,
    height:100,
    fontSize: 12,
  }
});
