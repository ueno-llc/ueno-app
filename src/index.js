import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'uia.Home',
    title: 'Ueno',
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});
