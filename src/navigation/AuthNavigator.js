import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NAVIGATION } from '@/constants';
import { Login } from '@/screens';
import Register from '@/screens/Register/Register';
import Verification from '@/screens/Vertification/Vertification';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name={NAVIGATION.login} options={{ headerShown: false }} />
      <Stack.Screen
        component={Register}
        name={NAVIGATION.register}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={Verification}
        name={NAVIGATION.verification}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
