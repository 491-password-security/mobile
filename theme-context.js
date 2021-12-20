import React from 'react';

export const themes = {
  myLightTheme: {
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
  },
  myDarkTheme: {
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
  },
};

export const ThemeContext = React.createContext(
  themes.myLightTheme // varsayılan değer
);