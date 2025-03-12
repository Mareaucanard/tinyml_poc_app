import { createContext } from 'react';
import { I18n } from 'i18n-js';
import colors from './themes';

const AppContext = createContext({
    i18n: new I18n(),
    colors: colors.light,
    devMode: process.env.EXPO_PUBLIC_DEV_MODE === 'true',
});

export default AppContext;
