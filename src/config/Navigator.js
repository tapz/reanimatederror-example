import React from 'react';

import {
  createStackNavigator,
  TransitionPresets,
  HeaderStyleInterpolators
} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Example from '../containers/Example';

const baseNavigationOptions = {
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  backTitleVisible: false,
  headerTruncatedBackTitle: null,
  cardShadowEnabled: false,
  headerBackTitleVisible: false,
  headerTitle: '',
  headerLayoutPreset: 'center',
  headerStyle: {
    shadowOpacity: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: 'transparent',
    borderBottomWidth: 0
  },
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerMode: 'float',
  animationEnabled: true
};

const navigationOptionsModal = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
  ...baseNavigationOptions,
  headerShown: false,
  mode: 'modal'
};

const routeConfigs = {
  Example: {screen: Example, navigationOptions: {
    ...navigationOptionsModal,
    headerShown: true
  }},
};

export default function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName={'Example'}
      screenOptions={{
        headerTintColor: 'yellow',
        headerStyle: {
          backgroundColor: 'blue'
        },
        headerTitleStyle: {
          color: 'white'
        },
        headerPressColorAndroid: 'green',
        headerMode: 'float'
      }}
    >
      {Object.entries(routeConfigs).map(([key, value]) => (
        <Stack.Screen
          key={key}
          name={key}
          component={value.screen}
          mode={value.navigationOptions.mode}
          options={{
            ...value.navigationOptions,
            headerTitle: value.navigationOptions.headerTitle
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
