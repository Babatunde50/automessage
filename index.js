import 'react-native-gesture-handler';
import * as React from 'react';
import {AppRegistry} from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme
} from 'react-native-paper';
import {NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import {OverflowMenuProvider} from 'react-navigation-header-buttons';
import {name as appName} from './app.json';

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: { ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors, primary: "#2fc4b2", accent: "#12947f" }
};

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  color: { ...PaperDefaultTheme.colors , ...NavigationDefaultTheme.colors, primary: "#2fc4b2", accent: "#12947f" }
};

export default function Main() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  function toggleTheme() {
    setIsDarkTheme(isDark => !isDark);
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <OverflowMenuProvider>
          <AppNavigator toggleTheme={toggleTheme} />
        </OverflowMenuProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
