import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import styles from './MessageStyle';
import { typography } from '@/theme';
export default Message = ({ isOwn, message, srcAvatar }) => {
  return (
    <View style={[styles.messageContainer, { justifyContent: isOwn ? 'flex-end' : 'flex-start' }]}>
      <Image
        style={styles.avatar}
        source={{
          uri: isOwn
            ? undefined
            : message.sender.avatarUri ||
              'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1',
        }}
      />
      <MessageFrame isOwn={isOwn} message={message} />
    </View>
  );
};

const MessageFrame = ({ isOwn, message }) => {
  return (
    <View
      style={[
        isOwn ? styles.ownMessage : styles.messageContentOther,
        { position: 'relative', marginBottom: 5 },
      ]}
    >
      <MessageDisplay message={message}></MessageDisplay>
      {message?.reactions && (
        <View
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            backgroundColor: 'gray',
            borderRadius: 10,
            bottom: -8,
            left: isOwn ? 5 : undefined,
            right: isOwn ? undefined : 5,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={[typography.text, { color: '#fff', fontSize: 12 }]}>
            {message.reactions?.length || 0}
          </Text>
        </View>
      )}
    </View>
  );
};

const MessageDisplay = ({ message }) => {
  //xu ly tin nhan bi thu hoi
  if (message.recalled) {
    return <Text style={styles.messageText}>Message is recalled</Text>;
  }

  //co  4 kieu tin nhan Text,File,Join,Leave. Xu dung if else or switch case de xu ly(tuy y)
  if (message.messageType == 'TEXT') {
    return <Text style={styles.messageText}>{message.content}</Text>;
  } else if (message.messageType == 'FILE') {
    return <Text style={styles.messageText}>send some file</Text>;
  } else if (message.messageType == 'JOIN') {
    return <Text style={styles.messageText}>join the chat</Text>;
  } else if (message.messageType == 'LEAVE') {
    return <Text style={styles.messageText}>Leave the chat</Text>;
  } else {
    return <Text style={styles.messageText}>sua</Text>;
  }
};

const fileData = {
  _id: '670e1fe8-a538-496b-b750-47e62497ac2d',
  files: [
    {
      fileName: 'th.jfif',
      downloadUri: 'http://103.71.96.70:8082/file/download/1712667440947_th.jfif',
      viewUri:
        'https://images.unsplash.com/photo-1712638699109-73682d9787fd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    },
  ],
  messageType: 'FILE',
  sender: {
    userId: '791dc6a1-2c42-4eba-be09-7cfcb7edb719',
    fullName: 'Bui Nhut Duy',
    role: 'OWNER',
  },
  timestamp: '09-04-2024 13:25:26',
  isRecalled: false,
  _class: 'com.message.zalor.entity.chat.FileMessage',
};

const FileMessage = ({ files }) => {
  return <View></View>;
};

const checkFullImage = (files) => {};
