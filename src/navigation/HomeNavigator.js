import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NAVIGATION } from '@/constants';
import { Home } from '@/screens';
import Chat from '@/screens/Chat/Chat';
import { AddFriend } from '@/screens/AddFriend/AddFriend';

const Stack = createNativeStackNavigator();

export function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.home}
        component={Home}
        options={{ headerShown: false }} // Ẩn header cho màn hình Chat
      />
      <Stack.Screen
        name={NAVIGATION.chat}
        component={Chat}
        options={{ headerShown: false }} // Ẩn header cho màn hình Chat
      />
        <Stack.Screen
        name={NAVIGATION.addfriend}
        component={AddFriend}
        options={{ headerShown: false }} // Ẩn header cho màn hình Chat
      />
    </Stack.Navigator>
  );
}
