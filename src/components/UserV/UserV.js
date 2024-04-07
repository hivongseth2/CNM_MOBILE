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
          uri: srcAvatar,
        }}
      />
      <Text style={[typography.text, { color: colors.text }]}>{name}</Text>
    </View>
  );
}
