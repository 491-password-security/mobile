import React from 'react';
import {Button, StyleSheet, View } from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import {ThemeContext} from '../theme-context';
import * as Keychain from "react-native-keychain";

import { Appbar } from 'react-native-paper';



export default function Settings({navigation}) {
  MultitaskBlur.blur();
  const { setTheme, theme } = React.useContext(ThemeContext);

  const handleLogout = async()=>{
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    navigation.navigate('LoginScreen');
  }

  return (
   
   <View style={styles.container}>
   <Appbar style={styles.topBar}>
      <Appbar.BackAction style={styles.appIcon} onPress={() => navigation.navigate('PasswordScreen', { name: 'PasswordScreen' })} />
      </Appbar>
        <Button
          color='mediumslateblue'
          title="Dark Mode"
          onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
           <Button color = 'mediumslateblue' title = "Logout" onPress ={handleLogout}/>
      </View>


  );
}
    

const styles = StyleSheet.create({
  topBar: {
    color: 'mediumslateblue',
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }})