import { useColorScheme, View } from 'react-native';
import { getLocales } from 'expo-localization';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';

import { translations } from './localization';
import colors from './themes';
import AppContext from './AppContext';
import HomeScreen from "./screens/Home.screen";
import { I18n } from 'i18n-js';

const { Navigator, Screen } = createStackNavigator();

export default function _App() {

    const [fontsLoaded] = useFonts({
      roboto: require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
        console.log('Fonts loaded');
      }
    }, [fontsLoaded]);


    const i18n = new I18n(translations);

    i18n.locale = getLocales()[0].languageCode;

    i18n.enableFallback = true;
    i18n.defaultLocale = 'en';

    const colorScheme = useColorScheme();
    const themedColors = colors[colorScheme];

    const defaultScreensOptions = { headerShown: false };

    if (!fontsLoaded) {
      return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <AppContext.Provider value={{
              i18n,
              colors: themedColors,
              devMode: process.env.EXPO_PUBLIC_DEV_MODE === 'true',
            }}>
              <NavigationContainer>
                <Navigator>
                  <Screen name="Home" component={HomeScreen} options={defaultScreensOptions} />
                </Navigator>
              </NavigationContainer>
            </AppContext.Provider>
        </View>
    );
}
