import React,{ useState, useEffect, NativeModules}  from 'react';
import {StyleSheet, View , SafeAreaView} from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import { Appbar,TextInput, Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

import { savePasswordShares } from '../password/save';
import { useTranslation } from 'react-i18next';
import './constants/i18n';


export default function AddLogin({navigation,route}) {
  MultitaskBlur.blur();
  const { colors } = useTheme();
  const {t, i18n} = useTranslation();
  const [usernameInput, setUsernameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
 
  return (
    <View useTheme={colors}>
      <SafeAreaView style={[styles.safeAreaBar, {backgroundColor: colors.appBarColor}]}>
        <Appbar style={[styles.appBar, {backgroundColor: colors.appBarColor}]}>
          <Appbar.Content title={t("Add Login")}/>
        </Appbar>
      </SafeAreaView>
      <View>
        <View style= {{paddingVertical:10}}> 
          <TextInput
            style ={[styles.text, {backgroundColor: colors.textInput}]}
            underlineColor={colors.primary}
            activeUnderlineColor= {colors.primary}
            left={<TextInput.Icon name="account"/>}
            label = {t("Username")}
            placeholder = {t("Enter Your Username")}
          />
            <View style= {{paddingVertical:10}}></View>
          <TextInput
            style ={[styles.text, {backgroundColor: colors.textInput}]}
            underlineColor={colors.primary}
            activeUnderlineColor= {colors.primary}
            left={<TextInput.Icon name="link"/>}
            label = {t("URL")}
            placeholder = {t("Enter URL")}
          />
        </View>
        
        
        <View style= {{paddingVertical:40, flexDirection:'row', justifyContent:'space-evenly'}}> 
          <Button
          mode="contained"
          color = {colors.primary}
          onPress={() => {
            savePasswordShares("altay", "altay.com", "gizli");
            /*
              .then(() => {
                console.log("saved password");
              })
              .catch((error) => {
                console.log(error);
              })
              */
          }}
          >
          {t("Save")}
          </Button>
        </View>
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

  text: {
    alignSelf: 'center',
    width: '100%',
    height: 80,
    fontSize: 12,
  },

  appBar: {
    shadowOpacity: 0, 
    elevation: 0,
  },

  safeAreaBar: {
    shadowOpacity: 1,
    elevation: 1,
  },
});
