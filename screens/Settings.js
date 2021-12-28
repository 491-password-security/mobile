import React,{ useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View,useColorScheme, Pressable, Alert, Platform} from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import {ThemeContext} from '../theme-context';
import * as Keychain from "react-native-keychain";
import { useTheme } from '@react-navigation/native';
import { Appbar,Button ,Switch,Text, Paragraph, Dialog, Portal,List} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import './constants/i18n';

import NativeBiometrics from "../Auth/bio"



const alertComponent = (title, mess, btnText, btnFunc) => {
  return Alert.alert(title, mess, [
    {
      text: btnText,
      onPress: btnFunc,
    },
  ]);
};

export default function Settings({navigation}) {
  
  MultitaskBlur.blur();
  const { setTheme, theme } = React.useContext(ThemeContext);
  const { colors } = useTheme();
  const systemTheme = useColorScheme();
  const {t, i18n} = useTranslation();
  

  const handleLogout = ()=>{
    masterPass = '';
    navigation.navigate('LoginScreen');
  }


  const allThemes = ['sys', 'light', 'dark'];

  const changeTheme = async (_theme) => {
    if(!(allThemes.includes(_theme))){
      console.log("Wrong theme!");
    }

    if(_theme === 'sys'){
      _theme = systemTheme;
    }
    setTheme(_theme);

    try {
      await AsyncStorage.setItem('ThemeKey', _theme);
    } catch (e) {
      console.log(e);
    }
  }

  
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .catch(err => console.log(err));
  };


  const allLanguages = ['en', 'tr'];
  const setLanguage = async (lang) => {
    if(!(allLanguages.includes(lang))){
      console.log("Wrong language!");
    }
    changeLanguage(lang);
    
    try {
      await AsyncStorage.setItem('Language', lang);
    } catch (e) {
      console.log(e);
    }

  }

  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  const isBiometricsEnabled = () => {
      AsyncStorage.getItem('EnabledBiometrics').then((enabledBiometrics) => {
        if(enabledBiometrics === undefined){
          return;
        }
        console.log(enabledBiometrics);
        setBiometricsEnabled(enabledBiometrics);
        console.log("a " + biometricsEnabled);
    });
  }

  useEffect(() => {
    isBiometricsEnabled();
  }, []);

  
  const enableBiometrics = async (enable) => {
    if(enable){
      if(Platform.OS === "ios"){
        const permissions = await NativeBiometrics.checkPermissions();
        if (!permissions){
          return alertComponent(
            t('Requires Permissions for Biometric Login'),
            '',
            t('OK'),
            () => {}
          );
        }

        const isBiometricAvailable = await NativeBiometrics.checkAvailability();
        if (!isBiometricAvailable){
          return alertComponent(
            t('Biometric Authentication not supported on device'),
            '',
            t('OK'),
            () => {}
          );
        }

        const username = "local";
        const credentials = await Keychain.getGenericPassword();
        if (!credentials){
          await Keychain.setGenericPassword(username, masterPass);
        }
        
      }else if(Platform.OS === 'android'){
        NativeBiometrics.isSensorAvailable()
          .then(async (avaible) => {
            console
            const username = "local";
            const credentials = await Keychain.getGenericPassword();
            if (!credentials){
              await Keychain.setGenericPassword(username, masterPass);
            }
          })
          .catch((error) => {
            console.log(error);
            return alertComponent(
              t('Biometric Authentication not supported on device'),
              '',
              t('OK'),
              () => {}
            );
          })
      }
    }
    await AsyncStorage.setItem('EnabledBiometrics', enable.toString());
    setBiometricsEnabled(enable)
  }
  
  return (
    <View>
      <SafeAreaView style={[styles.safeAreaBar, {backgroundColor: colors.appBarColor}]}>
        <Appbar style={[styles.appBar, {backgroundColor: colors.appBarColor}]}>
          <Appbar.Content title={t("Settings")}/>
        </Appbar>
      </SafeAreaView>
      <View style={{}}>
        <Pressable onPress={() => {enableBiometrics(!biometricsEnabled);}}>
          <View style={{ flexDirection: "row", margin: 20, }}>
            <Text style={{ alignSelf: 'center', color: colors.text, flex: 1}}>{t("Enable Biometric Login")}</Text>
            <Text style={{color: (biometricsEnabled) ? colors.switchColor : colors.text}}> {(biometricsEnabled) ? t("Enabled") : t("Disabled")}</Text>
          </View>
        </Pressable>
        <List.Section >
          <List.Accordion
          style ={{backgroundColor:colors.background}}
            left={props => <List.Icon {...props} icon="translate" color ={colors.switchColor} />}
            title={t("Languages")}
            titleStyle ={{color:colors.text}}
            >
            <List.Item title={t("English")}   titleStyle ={{color:colors.text}} onPress={() => {setLanguage('en')}}/>
            <List.Item title={t("Turkish")}   titleStyle ={{color:colors.text}} onPress={() => {setLanguage('tr')}} />
          </List.Accordion>
        </List.Section>
        <List.Section >
          <List.Accordion
            style ={{backgroundColor:colors.background}}
            left={props => <List.Icon {...props} icon="theme-light-dark" color ={colors.switchColor} />}
            title={t("Themes")}
            titleStyle ={{color:colors.text}}
            >
            <List.Item title={t("System Theme")}   titleStyle ={{color:colors.text}} onPress = {() => {changeTheme('sys')}}/>
            <List.Item title={t("Dark Theme")}   titleStyle ={{color:colors.text}} onPress = {() => {changeTheme('dark')}}/>
            <List.Item title={t("Light Theme")}   titleStyle ={{color:colors.text}} onPress = {() => {changeTheme('light')}}/>
          </List.Accordion>
        </List.Section>
        <Button style={styles.button} mode="contained" color = {colors.primary} onPress ={handleLogout} >
        {t("Logout")}
        </Button>
      </View>
    </View>


  );
}
const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    borderRadius: 8,
    margin: 5,
    width: "85%",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  appBar: {
    shadowOpacity: 0, 
    elevation: 0,
  },

  safeAreaBar: {
    shadowOpacity: 1,
    elevation: 1,
  },
})



