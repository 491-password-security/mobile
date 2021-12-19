import React,{ useState, useEffect,Pressable }  from 'react';
import { useColorScheme} from 'react-native';
import { NavigationContainer,DefaultTheme,DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import PasswordScreen from './screens/PasswordScreen';
import Settings from './screens/Settings';
import PasswordGenerator from './screens/PasswordGenerator';
import {ThemeContext} from './theme-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//export const ThemeContext = React.createContext();

const myLightTheme = {
  dark: false,
  colors: {
    primary: 'rgb(50, 50, 50)',
    secondary: 'rgb(18, 17, 73)',
    background: 'rgb(230, 230, 230)',
    card: 'rgb(230, 230, 230)',
    text: 'rgb(80, 80, 80)',
    border: 'rgb(0, 0, 0)',
    notification: 'rgb(255, 120, 120)',
  },
};
const myDarkTheme = {
  dark: false,
  colors: {
    primary: 'rgb(80, 80, 80)',
    secondary: 'rgb(100, 100, 100)',
    background: 'rgb(30, 30, 30)',
    card: 'rgb(10, 10, 10)',
    text: 'rgb(180, 180, 180)',
    border: 'rgb(0, 0, 0)',
    notification: 'rgb(255, 9, 255)',
  },
};

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
          <FontAwesomeIcon name="cog" color={color} size={size}/>
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
      <NavigationContainer theme={theme === 'light' ? myDarkTheme : myLightTheme}>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="LoginScreen" >
          <Stack.Screen name= "LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeTabs}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};