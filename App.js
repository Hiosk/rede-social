import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Auth from './pages/Auth';
import Register from './pages/Register';
import Perfil from './pages/Perfil';

const AppNavigator = createStackNavigator(
  {
    auth: {
      screen: Auth,
    },
    register: {
      screen: Register,
    },
    perfil: {
      screen: Perfil,
    },
  },
  {
    initialRouteName: 'auth',
    defaultNavigationOptions: {
      headerShown: false,
    }
  }

);

export default createAppContainer(AppNavigator);