import React,{ useState, useEffect,Pressable }  from 'react';

export const themes = {
  deneme: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  deneme2: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(
  themes.deneme // varsayılan değer
);