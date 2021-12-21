import React,{ useState, useEffect}  from 'react';
import {StyleSheet, View , SafeAreaView} from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import { Appbar,TextInput, Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

import { savePasswordShares } from '../password/save';


export default function AddLogin({navigation,route}) {
  MultitaskBlur.blur();
  const { colors } = useTheme();
  const [hidePass, setHidePass] = useState(true);
  const [urlInput, setUrlInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');

  return (
    <View useTheme={colors}>
      <SafeAreaView style={{backgroundColor: colors.primary}}>
        <Appbar style={{ backgroundColor: colors.primary }}>  
          <Appbar.Content title="Add Login"/>
        </Appbar>
      </SafeAreaView>
      <View>
        <View style= {{paddingVertical:10}}> 
          <TextInput
            underlineColor={colors.text}
            activeUnderlineColor= {colors.text}
            left={<TextInput.Icon name="account"/>}
            label = "Username"
            placeholder = "Enter Your Username"
            style ={styles.text}
          />
          <View style= {{paddingVertical:10}}></View>
          <TextInput
        style ={styles.text}
        underlineColor={colors.primary}
        activeUnderlineColor= {colors.primary}
        label = "Password"
        placeholder = "Enter Password"
        secureTextEntry={hidePass ? true : false}
        left={<TextInput.Icon name="lock"/>}
        right={<TextInput.Icon name="eye" onPress={() => setHidePass(!hidePass)} />}
       />
            <View style= {{paddingVertical:10}}></View>
          <TextInput
            underlineColor={colors.text}
            activeUnderlineColor= {colors.text}
            left={<TextInput.Icon name="link"/>}
            label = "URL"
            placeholder = "Enter URL"
            style ={styles.text}
          />
        </View>
        
        
        <View style= {{paddingVertical:40, flexDirection:'row', justifyContent:'space-evenly'}}> 
          <Button
          mode="contained"
          color = {colors.primary}
          onPress={() => {
            try{
              savePasswordShares("altay", "altay.com", "gizli");
            }catch(error){
              console.log(error);
            }
          }}
          >
          Save
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
  }
});
