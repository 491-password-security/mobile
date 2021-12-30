import React, {useState, } from 'react';
import {StyleSheet, View , SafeAreaView} from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import { Appbar,TextInput, Button,ActivityIndicator, Colors,List} from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import Snackbar from 'react-native-snackbar';

import { getPasswordFromServer } from '../password/get';

import { useTranslation } from 'react-i18next';
import './constants/i18n';
import { ScrollView } from 'react-native-gesture-handler';


var recentUsernames = [];
var recentURL = [];
var renderLoop = [];
export default function PasswordScreen({navigation}) {
  MultitaskBlur.blur();
  const { colors } = useTheme();
  const [urlInput, setUrlInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [loadingGetPassword, setLoadingGetPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const {t, i18n} = useTranslation();

  const handleGetPassword =  () => {
    setLoadingGetPassword(true);
    setIsVisible(false);
    recentUsernames.push(usernameInput);
    recentURL.push(urlInput);
    handleGetRecentsRender();
    getPasswordFromServer(usernameInput, urlInput, masterPass, () => {
      console.log(lastReceivedPass);
      Clipboard.setString(lastReceivedPass);
      Snackbar.dismiss();
      Snackbar.show({
        text: t("Password Copied to Clipboard \n" + lastReceivedPass),
        duration: 2500,
        textColor: colors.text,
        numberOfLines: 1,
        backgroundColor: colors.background,
        action:{
          text: t('Dismiss'),
          textColor: colors.switchColor,
          onPress: () => {Snackbar.dismiss()}
        }
      });
      setLoadingGetPassword(false);
      setIsVisible(true);
      lastReceivedPass = '';
  });    
  }

  /*const handleGetRecents =  () => {
    if(loadingGetPassword == false){
      if(recentURL.length && recentUsernames.length > 0){
        setIsVisible(!isVisible);
      }
      setLoadingGetPassword(false);
      handleGetRecentsRender();   
    }
  }*/
  
  const handleGetRecentsRender =  () => {
    renderLoop = [];
    
    for (let i = 0; i < Math.min(recentUsernames.length, 4); i++) {
      renderLoop.push(
        <View key={i}>
          <List.Item
            title = {recentUsernames[i]}
            titleStyle ={{color:colors.text}}
            description= {recentURL[i]}
            descriptionStyle = {{color:colors.text}}
            left={props => <List.Icon {...props} icon="history" color ={colors.switchColor}/>}
          />
        </View>
      );
    }
  }
  
  
  return (
    <View useTheme={colors}>
      <SafeAreaView style={[styles.safeAreaBar, {backgroundColor: colors.appBarColor}]}>
        <Appbar style={[styles.appBar, {backgroundColor: colors.appBarColor}]}>
          <Appbar.Content title={t("Vault")}/>
        </Appbar>
      </SafeAreaView>
      <View>
        <View style= {{paddingVertical:10}}> 
          <TextInput
            style ={[styles.text, {backgroundColor: colors.textInput}]}
            underlineColor={colors.text}
            activeUnderlineColor= {colors.text}
            left={<TextInput.Icon name="account"/>}
            autoCapitalize='none'
            autoCorrect={false}
            label = {t("Username")}
            placeholder = {t("Enter Your Username")}
            onChangeText={input => setUsernameInput(input)}
            value={usernameInput}
          />
          <View style= {{paddingVertical:10}}></View>
          <TextInput
            style ={[styles.text, {backgroundColor: colors.textInput}]}
            underlineColor={colors.text}
            activeUnderlineColor= {colors.text}
            left={<TextInput.Icon name="link"/>}
            autoCapitalize='none'
            autoCorrect={false}
            label = {t("URL")}
            placeholder = {t("Enter URL")}
            onChangeText={input => setUrlInput(input)}
            value={urlInput}
          />
        </View>
        <View style= {{paddingVertical:40, flexDirection:'row', justifyContent:'space-evenly'}}> 
          <Button
          mode="contained"
          color = {colors.primary}
          onPress={() => {  
            handleGetPassword();
          }}
          >
          {t("Get Password")}
          </Button>
        </View>
          <ActivityIndicator animating={loadingGetPassword} color={colors.switchColor} />
          {(isVisible) && renderLoop}
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
