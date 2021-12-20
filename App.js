import React,{ useState, useEffect,Pressable }  from 'react';
import { useColorScheme} from 'react-native';
import { NavigationContainer,DefaultTheme,DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import PasswordScreen from './screens/PasswordScreen';
import Settings from './screens/Settings';
import PasswordGenerator from './screens/PasswordGenerator';
import {ThemeContext,themes} from './theme-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'


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

export default App = () => {
  const [theme, setTheme] = useState('dark');
  const themeData = { theme, setTheme };  
  const scheme = useColorScheme();
  return (
    <ThemeContext.Provider value={themeData}>
      <NavigationContainer theme={theme === 'light' ? themes.myDarkTheme : themes.myLightTheme}>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="LoginScreen" >
          <Stack.Screen name= "LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeTabs}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};