import React,{ useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View } from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import {ThemeContext} from '../theme-context';
import * as Keychain from "react-native-keychain";
import { useTheme } from '@react-navigation/native';

import { Appbar,Button ,Switch,Text,Divider} from 'react-native-paper';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

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
   <View>
    <SafeAreaView style={{backgroundColor: colors.primary}}>
      <Appbar style={{ backgroundColor: colors.primary, }}>
        <Appbar.Content title="Settings"/>
      </Appbar>
    </SafeAreaView>
      <View style={{}}>
        <View style={{ flexDirection: "row", margin: 20, }}>
          <Text style={{ alignSelf: 'center', color: colors.text, flex: 20}}>Dark Mode</Text>
          <Switch color = {colors.primary} value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        <Button style={styles.button} mode="contained" color = {colors.primary} onPress ={handleLogout} >
        Logout
        </Button>
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

  button:{
    alignSelf: 'center',
    borderRadius: 8,
    margin: 5,
    width: "85%",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})