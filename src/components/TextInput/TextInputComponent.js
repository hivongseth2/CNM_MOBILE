/* eslint-disable import/named */
/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { StyleSheet, View, TextInput, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { MoreIcon } from '@/assets/svg/Icon';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getUser } from '@/selectors/UserSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageAction } from '@/actions/MessengerAction';

export default function TextInputComponent() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');

  const sendText = () => {
    console.log('loi');
    dispatch(
      sendMessageAction({ receiverId: '721b8305-5b09-466d-80b9-79eb4e98121f', content: message })
    );
    setMessage('');
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Xử lý hình ảnh được chọn ở đây
        // Ví dụ: setMessage(response.uri);
        console.log(response);
      }
    });
  };

  return (
    <View style={styles.searchSection}>
      <TextInput
        accessibilityLabel="Text input field"
        accessibilityHint="Enter your message here"
        style={styles.input}
        placeholder="Nhắn tin"
        value={message}
        onChangeText={setMessage}
        underlineColorAndroid="transparent"
      />
      {/* ở trên nếu đã nhập tin nhắn , ở dưới nếu tin nhắn rỗng */}
      {message.length > 0 ? (
        <Pressable onPress={sendText}>
          <Image style={styles.icon} source={require('../../assets/send.png')} />
        </Pressable>
      ) : (
        <Pressable onPress={openImagePicker}>
          <MoreIcon />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 4,
    color: '#424242',
  },
  icon: {
    width: 25,
    height: 25,
    padding: 5,
    margin: 5,
    marginRight: 10,
  },
});
