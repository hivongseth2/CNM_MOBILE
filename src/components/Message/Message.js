import { Image, ScrollView, StyleSheet, Text, View, Animated, Easing } from 'react-native';
import styles from './MessageStyle';
import { useTheme } from '@react-navigation/native';

import { HeartIcon } from '@/assets/svg/Icon';
import { useRef } from 'react';

export default Message = ({ isOwn, message, srcAvatar, reactions }) => {
  const { colors } = useTheme();
  const heartScale = useRef(new Animated.Value(1)).current;

  const animateHeart = () => {
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.8,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={[styles.messageContainer, { justifyContent: isOwn ? 'flex-end' : 'flex-start' }]}>
      <Image
        style={styles.avatar}
        source={{
          uri: isOwn
            ? undefined
            : srcAvatar ||
              'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1',
        }}
      />
      <View style={isOwn ? styles.ownMessage : styles.messageContentOther}>
        <Text style={styles.messageText}>{message}</Text>
        {reactions && reactions.length > 0 && reactions[0].reactType === 'HEART' ? (
          <Animated.View
            style={{
              transform: [{ scale: heartScale }],
              width: 10,
              height: 10,
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}
          >
            <HeartIcon width={19} height={19} color={colors.red} onPress={animateHeart} />
          </Animated.View>
        ) : (
          <View
            style={{
              width: 10,
              height: 10,
              position: 'absolute',
              right: 0,
              bottom: 0,
              opacity: 0.6,
            }}
          >
            <HeartIcon width={19} height={19} color={colors.gray} />
          </View>
        )}
      </View>
    </View>
  );
};
