import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavigationHome from './NavigationHome';
import EditAgenda from '../pages/EditAgenda';
import PageHome from '../pages/PageHome';

const Stack = createNativeStackNavigator();

const NavigationUserSigned = () => {
  console.log('estou na NavigationUserSigned');
  return (
    <Stack.Navigator initialRouteName="NavigationHome">
      <Stack.Screen
        name="NavigationHome"
        component={NavigationHome}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="PageHome"
        component={PageHome}
        options={{
          header: () => null,
        }}
      />         
      <Stack.Screen
        name="EditAgenda"
        component={EditAgenda}
        options={{
          header: () => null,
        }}
      />         
    </Stack.Navigator>
  );
};

export default NavigationUserSigned;
