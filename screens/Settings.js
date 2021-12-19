import React,{ useState, useEffect} from 'react';
import {StyleSheet, View } from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import {ThemeContext} from '../theme-context';
import * as Keychain from "react-native-keychain";
import { useTheme } from '@react-navigation/native';

import { Appbar,Button ,Switch,Text,Divider} from 'react-native-paper';

export default function Settings({navigation}) {
  
  MultitaskBlur.blur();
  const { setTheme, theme } = React.useContext(ThemeContext);
  const { colors } = useTheme();


  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const handleLogout = async()=>{
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    navigation.navigate('LoginScreen');
  }
  
  const onToggleSwitch = ()=>{
    setIsSwitchOn(!isSwitchOn);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  
  return (
   <View style={styles.container}>
   <Appbar style={styles.topBar}>
      {/* <Appbar.BackAction style={styles.appIcon} onPress={() => navigation.navigate('PasswordScreen', { name: 'PasswordScreen' })} /> */}
      <Appbar.Content title="Settings"/>
    </Appbar>
      <View>
        <View style={{
            flexDirection: "row",
            height: 100,
            padding: 20
          }}>
          <Text style={{ color: colors.text, paddingHorizontal:30 }}>Dark Mode</Text>

          <Switch color = {colors.primary} value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        <Divider />
        <Button mode="contained" color = {colors.primary} onPress ={handleLogout} >
        Logout
        </Button>
        <Divider />
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }})