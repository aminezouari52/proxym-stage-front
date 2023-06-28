import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from 'assets/locales/en.json';
import translationAR from 'assets/locales/ar.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: '.',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
