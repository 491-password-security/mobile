import React from 'react';

export const themes = {
  myLightTheme: {
    dark: false,
    colors: {
      primary: 'rgb(50, 50, 50)',
      secondary: 'rgb(18, 17, 73)',
      background: 'rgb(200, 200, 200)',
      card: 'rgb(200, 200, 200)',
      text: 'rgb(80, 80, 80)',
      textInput: 'rgb(200, 200, 200)',
      border: 'rgb(0, 0, 0)',
      notification: 'rgb(255, 120, 120)',
      switchColor: 'rgb(127, 174, 244)',
      appBarColor: 'rgb(200, 200, 200)',
    },
  },
  myDarkTheme: {
    dark: false,
    colors: {
      primary: 'rgb(80, 80, 80)',
      secondary: 'rgb(100, 100, 100)',
      background: 'rgb(30, 30, 30)',
      card: 'rgb(30, 30, 30)',
      text: 'rgb(180, 180, 180)',
      textInput: 'rgb(150, 150, 150)',
      border: 'rgb(0, 0, 0)',
      notification: 'rgb(255, 9, 255)',
      switchColor: 'rgb(127, 174, 244)',
      appBarColor: 'rgb(30, 30, 30)',
    },
  },
};

export const ThemeContext = React.createContext(
  themes.myLightTheme // varsayılan değer
);