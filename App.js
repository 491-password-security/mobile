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

export default App = () => {
  const [theme, setTheme] = useState('dark');
  const themeData = { theme, setTheme };  
  //const scheme = useColorScheme();
return (
  <ThemeContext.Provider value={themeData}>
  <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="LoginScreen" >
      <Stack.Screen name= "LoginScreen" component={LoginScreen} />
      <Stack.Screen name= "PasswordScreen" component={PasswordScreen} />
      <Stack.Screen name= "Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeContext.Provider>
  );
};