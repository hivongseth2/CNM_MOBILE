import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContentOther: {
    maxWidth: '70%', // Điều chỉnh chiều rộng tối đa của tin nhắn
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E5E5EA', // Màu nền cho tin nhắn
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  ownMessage: {
    maxWidth: '70%', // Điều chỉnh chiều rộng tối đa của tin nhắn
    padding: 10,
    justifyContent: 'flex-end',
    borderRadius: 10,
    backgroundColor: '#DCF8C6', // Màu nền cho tin nhắn
  },
  otherMessageText: {
    flexDirection: 'row',
    backgroundColor: '#E5E5EA', // Màu nền cho tin nhắn của người gửi khác
  },
});
