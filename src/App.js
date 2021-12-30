import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import React, { useRef } from 'react';

Text.defaultProps = {
  allowFontScaling: false
};

import { NavigationContainer } from '@react-navigation/native';

import Navigator from './config/Navigator';
import AppContext from './AppContext';

const ReanimatedExample = () => {
  const navigationRef = useRef(null);
  
  return (
    <AppContext.Provider value={{}}>
      <NavigationContainer ref={navigationRef}>
        <View style={[styles.mainView, { 
          backgroundColor: 'transparent' 
        }]}>
          <Navigator />
        </View>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  }
});

AppRegistry.registerComponent('Example', () => ReanimatedExample);