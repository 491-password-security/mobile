import React,{ useState,useEffect, useCallback}  from 'react';
import { useColorScheme} from 'react-native';
import { NavigationContainer,DefaultTheme,DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import PasswordScreen from './screens/PasswordScreen';
import Settings from './screens/Settings';
import AddLogin from './screens/AddLogin';
import PasswordGenerator from './screens/PasswordGenerator';
import {ThemeContext,themes} from './theme-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();






function HomeTabs(){
  return (
    <Tab.Navigator screenOptions={{headerShown:false}} initialRouteName="Vault">
      <Tab.Screen
      name = "Vault" 
      component = {PasswordScreen}
      options={{
        tabBarLabel: 'Vault',
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon name="user-secret" color={color} size={size}/>
        ),
      }}
      />
      
      <Tab.Screen
      name = "Generator"
      component = {PasswordGenerator}
      options={{
        tabBarLabel: 'Generator',
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon name="redo" color={color} size={size}/>
        ),
      }}
      />

      <Tab.Screen
      name = "AddLogin"
      component = {AddLogin}
      options={{
        tabBarLabel: 'Add Login',
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon name="plus-square" color={color} size={size}/>
        ),
      }}
      />
      
      <Tab.Screen
      name = "Settings"
      component = {Settings}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon name="cog" color={color} size={size}/>
        ),
      }}
      />
    </Tab.Navigator>
  );
}
const savedTheme = '';
export default App = () => {


   const getTheme = async (savedTheme)=>{
    try {
      const savedThemeTMP = await AsyncStorage.getItem('ThemeKey');
      //console.log(savedThemeTMP);
      if(savedThemeTMP !== null) {
        savedTheme = savedThemeTMP; 
        console.log(savedTheme);
        return savedTheme;
      }
    } catch(e) {
      console.log('error');
    }
  }

  getTheme(savedTheme); 

  //console.log(savedTheme);
  const systemTheme = useColorScheme();
  //console.log(systemTheme);
  const [theme, setTheme] = useState(systemTheme);  /// BURAYA SYSTEMTHEME YERINE SAVEDTHEME VERILMELI..
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