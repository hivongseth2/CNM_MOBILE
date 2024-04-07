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
            : 'https://kenh14cdn.com/thumb_w/660/2020/5/28/0-1590653959375414280410.jpg',
        }}
      />
      <View style={isOwn ? styles.ownMessage : styles.messageContentOther}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
};
