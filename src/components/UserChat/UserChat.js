import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { typography } from '@/theme';
import styles from './UserChatStyle';
import formatTimeDifference from '@/utils/time';
import { NAVIGATION } from '@/constants';

export default function UserChat({ id, name, srcAvatar, chatContent, time }) {
  console.log(id, name, srcAvatar, chatContent);
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate(NAVIGATION.chat, {
          srcAvatar: srcAvatar,
          chatContent: chatContent,
        });
      }}
    >
      <View style={styles.containerH}>
        <Image
          style={styles.avatar}
          source={{
            uri: srcAvatar
              ? srcAvatar
              : 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1',
          }}
        />
        <View style={styles.containerText}>
          <Text style={[typography.name, { color: colors.text }]}>{name}</Text>
          <Text
            style={[typography.text, { color: 'gray', maxWidth: 220, width: 220 }]}
            numberOfLines={1}
          >
            {/* {chatContent[0].sender}: {chatContent[chatContent.length - 1].message} */}
            {chatContent}
          </Text>
        </View>
        <Text style={[typography.time, { color: 'lightGray' }]} numberOfLines={1}>
          {formatTimeDifference(time)}
          {/* {time} */}
        </Text>
      </View>

      {/* <Image style={styles.setting} source={require('../../assets/settingBlue.png')}></Image> */}
    </Pressable>
  );
}
