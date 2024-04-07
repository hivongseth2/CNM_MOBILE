import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import styles from './MessageStyle';
export default Message = ({ isOwn, message, srcAvatar }) => {
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
      </View>
    </View>
  );
};
