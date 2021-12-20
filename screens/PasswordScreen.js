import React from 'react';
import {StyleSheet, Text, View , SafeAreaView, Image} from 'react-native';
import MultitaskBlur from "react-native-multitask-blur";
import { Appbar,TextInput, Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';




export default function PasswordScreen({navigation}) {
  MultitaskBlur.blur();
  const { colors } = useTheme();
  //const [urlInput, setUrlInput] = useState('');
  //const [userInput, setUserInput] = useState('');

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
    <View useTheme={colors}>
      <SafeAreaView style={{backgroundColor: colors.primary}}>
        <Appbar style={{ backgroundColor: colors.primary }}>  
          <Appbar.Content title="Home"/>
        </Appbar>
      </SafeAreaView>
      <View>
        <View style= {{paddingHorizontal:0}}> 
          <TextInput
            underlineColor={colors.text}
            activeUnderlineColor= {colors.text}
            left={<TextInput.Icon name="account"/>}
            label = "Username"
            placeholder = "Enter Your Username"
            style ={styles.text}
          />

          <View style= {{paddingVertical:5}}></View>
          
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
    height:80,
    fontSize: 12,
  }
});
