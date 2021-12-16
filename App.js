import React,{ useState, useEffect,Pressable }  from 'react';
import { useColorScheme} from 'react-native';
import { NavigationContainer,DefaultTheme,DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import PasswordScreen from './screens/PasswordScreen';
import Settings from './screens/Settings';
import {ThemeContext} from './theme-context';

const Stack = createNativeStackNavigator();

//export const ThemeContext = React.createContext();

const myLightTheme = {
  dark: false,
  colors: {
    primary: 'rgb(39, 59, 122)',
    secondary: 'rgb(18, 17, 73)',
    background: 'rgb(253, 253, 253)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(235, 235, 235)',
    border: 'rgb(0, 0, 0)',
    notification: 'rgb(255, 69, 58)',
  },
};
const myDarkTheme = {
  dark: false,
  colors: {
    primary: 'rgb(39, 59, 122)',
    secondary: 'rgb(18, 17, 73)',
    background: 'rgb(0, 0, 0)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(235, 235, 235)',
    border: 'rgb(0, 0, 0)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default App = () => {
  const [theme, setTheme] = useState('dark');
  const themeData = { theme, setTheme };  
  const scheme = useColorScheme();
return (
  <ThemeContext.Provider value={themeData}>
  <NavigationContainer theme={theme === 'light' ? myDarkTheme : myLightTheme}>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="LoginScreen" >
      <Stack.Screen name= "LoginScreen" component={LoginScreen} />
      <Stack.Screen name= "PasswordScreen" component={PasswordScreen} />
      <Stack.Screen name= "Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeContext.Provider>
  );
};