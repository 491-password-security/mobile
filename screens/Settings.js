import React,{ useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View,useColorScheme } from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import {ThemeContext} from '../theme-context';
import * as Keychain from "react-native-keychain";
import { useTheme } from '@react-navigation/native';
import { Appbar,Button ,Switch,Text, Paragraph, Dialog, Portal,List} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({navigation}) {
  
  MultitaskBlur.blur();
  const { setTheme, theme } = React.useContext(ThemeContext);
  const { colors } = useTheme();
  const systemTheme = useColorScheme();


  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const handleLogout = async()=>{
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    masterPass = '';
    //console.log(masterPass);
    navigation.navigate('LoginScreen');
  }

  const handleOFFBIO = async()=>{
    const logout = await Keychain.resetGenericPassword();
    masterPass = '';
    //console.log(masterPass);
    //navigation.navigate('LoginScreen');
  }

  const handleLogin = async () => {
    // login api call here
    const username = "local";
    const credentials = await Keychain.getGenericPassword();
    console.log("saved");
    //await Keychain.resetGenericPassword();
    if (!credentials){
      await Keychain.setGenericPassword(username, masterPass);
      console.log("saved");
    }

  }
  const onToggleSwitch = async ()=>{
    setIsSwitchOn(!isSwitchOn);
    if(isSwitchOn){
      handleOFFBIO();
    }
    else{
      handleLogin();
    }
  }
  const setThemeDark = async ()=>{
    setTheme(theme === 'dark' ? 'dark' : 'dark');
    //console.log(theme);
    try {
      await AsyncStorage.setItem('ThemeKey', 'dark');
    } catch (e) {
      // saving error
    }
  }
  const setThemeLight = async ()=>{
    setTheme(theme === 'light' ? 'light' : 'light');
    //console.log(theme);
    try {
      await AsyncStorage.setItem('ThemeKey', 'light');
    } catch (e) {
      // saving error
    }
  }
  const setThemeSystem= async ()=>{
    setTheme(theme === systemTheme ? systemTheme : systemTheme);
    try {
      await AsyncStorage.setItem('ThemeKey', systemTheme);
    } catch (e) {
      // saving error
    }
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
          <Text style={{ alignSelf: 'center', color: colors.text, flex: 20}}>Enable Biometric Login</Text>
          <Switch color = {colors.primary} value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        <List.Section >
      <List.Accordion
      style ={{backgroundColor:colors.background}}
        title="Themes"
        titleStyle ={{color:colors.text}}
        >
        <List.Item title="System Theme"   titleStyle ={{color:colors.text}} onPress={setThemeSystem}/>
        <List.Item title="Dark Theme "   titleStyle ={{color:colors.text}} onPress={setThemeDark} />
        <List.Item title="Light Theme "   titleStyle ={{color:colors.text}} onPress={setThemeLight} />
      </List.Accordion>
    </List.Section>

        <Button style={styles.button} mode="contained" color = {colors.primary} onPress ={handleLogout} >
        Logout
        </Button>
      </View>
  
    </View>


  );
}
const styles = StyleSheet.create({
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