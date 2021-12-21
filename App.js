import React,{ useState}  from 'react';
import { useColorScheme} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import PasswordScreen from './screens/PasswordScreen';
import Settings from './screens/Settings';
import AddLogin from './screens/AddLogin';
import PasswordGenerator from './screens/PasswordGenerator';
import {ThemeContext,themes} from './theme-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import './screens/constants/i18n';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

let currentLanguage = 'en';


function HomeTabs(){
  const {t, i18n} = useTranslation();
  
  return (
    <Tab.Navigator screenOptions={{headerShown:false}} initialRouteName="Vault">
      <Tab.Screen
      name = "Vault" 
      component = {PasswordScreen}
      options={{
        tabBarLabel: t('Vault'),
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon name="user-secret" color={color} size={size}/>
        ),
      }}
      />
      
      <Tab.Screen
      name = "Generator"
      component = {PasswordGenerator}
      options={{
        tabBarLabel: t('Generator'),
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon name="redo" color={color} size={size}/>
        ),
      }}
      />

      <Tab.Screen
      name = "AddLogin"
      component = {AddLogin}
      options={{
        tabBarLabel: t('Add Login'),
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon name="plus-square" color={color} size={size}/>
        ),
      }}
      />
      
      <Tab.Screen
      name = "Settings"
      component = {Settings}
      options={{
        tabBarLabel: t('Settings'),
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon name="cog" color={color} size={size}/>
        ),
      }}
      />
    </Tab.Navigator>
  );
}
export default App = () => {
  const {t, i18n} = useTranslation();
  
 const getLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('Language');
      if(savedLanguage !== null) {
        //console.log(savedLanguage);
        return savedLanguage; 
      }
      else{
        //console.log("umur");
      }
    } catch(e) {
      console.log(e);
    }
  }
  
  getLanguage().then((savedLanguage) => {
    if(savedLanguage !== currentLanguage){
    i18n
      .changeLanguage(savedLanguage);
      currentLanguage = savedLanguage;
    }
  }); 


   const getTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('ThemeKey');
      if(savedTheme !== null) {
        return savedTheme; 
      }
    } catch(e) {
      console.log(e);
    }
  }

  const [theme, setTheme] = useState(systemTheme);  

  getTheme().then((savedTheme) => {
    setTheme(savedTheme)
  }); 

  const systemTheme = useColorScheme();
  const themeData = { theme, setTheme }; 
  
  return (
    <ThemeContext.Provider value={themeData}>
      <NavigationContainer theme={theme === 'dark' ? themes.myDarkTheme : themes.myLightTheme}>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="LoginScreen" >
          <Stack.Screen name= "LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};