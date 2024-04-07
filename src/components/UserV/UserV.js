import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { typography } from '@/theme';
import styles from './UserVStyle';

export default function UserV({ name, srcAvatar }) {
  const { colors } = useTheme();

  return (
    <View style={styles.centerAvatar}>
      <Image
        style={styles.avatar}
        source={{
          uri: srcAvatar
            ? srcAvatar
            : 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1',
        }}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[typography.text, { color: colors.text, overflow: 'hidden', width: 100 }]}
      >
        {name}
      </Text>
    </View>
  );
}
