import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { TabBarIcon } from '@/components';
import { HomeNavigator } from '@/navigation/HomeNavigator';
import { ProfileNavigator } from '@/navigation/ProfileNavigator';
import { NAVIGATION, TABS } from '@/constants/navigation';
import { useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { Friends } from '@/screens/Friends/Friends';
import { Text, View } from 'react-native';
import { GroupPeople } from '@/assets/svg/Icon';

const Tab = createBottomTabNavigator();
const NotificationBadge = ({ count }) => {
  return (
    <View style={{ position: 'relative' }}>
      <GroupPeople width={30} height={30} color="white" />
      {count > 0 && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'red',
            borderRadius: 10,
            display: 'flex',
            width: 15,
            height: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10 }}>{count}</Text>
        </View>
      )}
    </View>
  );
};
export function AppNavigator() {
  const { colors } = useTheme();
  const [notificationCount, setNotificationCount] = useState(2); // Số lượng thông báo chưa đọc

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
      <Tab.Screen
        name={TABS.friends}
        component={Friends}
        options={{
          tabBarIcon: ({ color, size }) => <NotificationBadge count={notificationCount} />,
        }}
      />

      <Tab.Screen name={TABS.profile} component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
