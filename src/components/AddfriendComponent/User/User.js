import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { typography } from '@/theme';
import styles from './UserStyle';
import formatTimeDifference from '@/utils/time';
import { NAVIGATION } from '@/constants';

export default function User({ user }) {
  console.log('user prop', user.user);
  const friend = user?.user;
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <Pressable
      style={styles.container}
      // onPress={() => {
      //   navigation.navigate(NAVIGATION.chat, {
      //     srcAvatar: user.avatarUri,
      //     chatContent: chatContent,
      //   });
      // }}
    >
      <View style={styles.containerH}>
        <Image
          style={styles.avatar}
          source={{
            uri: friend.avatarUri,
          }}
        />
        <View style={styles.containerText}>
          <Text style={[typography.name, { color: colors.text }]}>{friend.fullName}</Text>
          <Text
            style={[typography.text, { color: 'gray', maxWidth: 220, width: 220 }]}
            numberOfLines={1}
          >
            {friend.email}
          </Text>
        </View>
      </View>

      {/* <Image style={styles.setting} source={require('../../assets/settingBlue.png')}></Image> */}
    </Pressable>
  );
}
