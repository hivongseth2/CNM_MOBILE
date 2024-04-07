import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TabBarIcon } from '@/components';
import { HomeNavigator } from '@/navigation/HomeNavigator';
import { ProfileNavigator } from '@/navigation/ProfileNavigator';
import { NAVIGATION, TABS } from '@/constants/navigation';
import { useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  const { colors } = useTheme();
  const user = useSelector(getUser);
function getTabBarVisibility(routeName) {
  return routeName === NAVIGATION.chat || routeName === NAVIGATION.addfriend ? 'none' : 'flex';
}

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.activeTab,
        tabBarInactiveTintColor: colors.inactiveTab,
        tabBarIcon: ({ color }) => <TabBarIcon color={color} routeName={route.name} />,

                tabBarStyle: { display: getTabBarVisibility(route.name) }, // Thêm dòng này

      })}
    >
      <Tab.Screen name={TABS.home} component={HomeNavigator} />
      <Tab.Screen name={TABS.profile} component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
