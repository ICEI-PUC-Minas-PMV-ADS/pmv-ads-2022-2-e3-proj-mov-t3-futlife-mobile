import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Login from '../pages/Login';
import Register from '../pages/Register';
import PageHome from '../pages/PageHome';

const Tab = createBottomTabNavigator();

export default function NavigationUserUnsigned() {
  console.log('estou na NavigationUserUnsigned');
  return (
    <Tab.Navigator initialRouteName="FUTLIFE">
      <Tab.Screen
        name="FUTLIFE"
        component={PageHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />      
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      /> 

      <Tab.Screen
        name="Register"
        component={Register}        
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),          
        }}
      />           
    </Tab.Navigator>
  );
}