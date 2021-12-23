import React,{ useState, useEffect, NativeModules}  from 'react';
import {StyleSheet, View , SafeAreaView} from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import { Appbar,TextInput, Button,ActivityIndicator, Colors } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import Snackbar from 'react-native-snackbar';

import { savePasswordShares } from '../password/save';
import { useTranslation } from 'react-i18next';
import './constants/i18n';


export default function AddLogin({navigation,route}) {
  MultitaskBlur.blur();
  const { colors } = useTheme();
  const {t, i18n} = useTranslation();
  const [usernameInput, setUsernameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  //const [loadingIndicatorSave, setLoadingIndicatorSave] = useState(false)
 
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
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={input => setUsernameInput(input)}
            value={usernameInput}
          />
            <View style= {{paddingVertical:10}}></View>
          <TextInput
            style ={[styles.text, {backgroundColor: colors.textInput}]}
            underlineColor={colors.primary}
            activeUnderlineColor= {colors.primary}
            left={<TextInput.Icon name="link"/>}
            label = {t("URL")}
            placeholder = {t("Enter URL")}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={input => setUrlInput(input)}
            value={urlInput}
          />
        </View>
        

        <View style= {{paddingVertical:40, flexDirection:'row', justifyContent:'space-evenly'}}> 
          <Button
          mode="contained"
          color = {colors.primary}
          onPress={() => {
            console.log(usernameInput);
            console.log(urlInput);
            const savedPass = savePasswordShares(usernameInput, urlInput, masterPass)
            Clipboard.setString(savedPass);
            Snackbar.dismiss();
            Snackbar.show({text: t("Password Copied to Clipboard \n" + savedPass), duration: 2500, textColor: colors.text, numberOfLines: 2, backgroundColor: colors.background});
            //savePasswordShares(usernameInput, urlInput, masterPass)
            
            console.log(savedPass);
          }}
          >
          {t("Save")}
          </Button>
        </View>
        <ActivityIndicator animating={false} color={Colors.red800} />
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
