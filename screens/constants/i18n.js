import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import en from './translations/en/en.json';
import tr from './translations/tr/tr.json';



i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    tr: tr,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;