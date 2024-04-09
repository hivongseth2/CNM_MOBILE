/* eslint-disable import/named */
/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { StyleSheet, View, TextInput, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { MoreIcon } from '@/assets/svg/Icon';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getUser } from '@/selectors/UserSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { sendFileAction, sendMessageAction } from '@/actions/MessengerAction';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TextInputComponent() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);

  const [message, setMessage] = useState('');

  const sendText = () => {
    console.log('loi');
    dispatch(
      sendMessageAction({ receiverId: '721b8305-5b09-466d-80b9-79eb4e98121f', content: message })
    );
    setMessage('');
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then(async (images) => {
        const temp = [];
        const formData = new FormData();
        const token = await AsyncStorage.getItem('token');

        const receiver = { receiverId: '4eb675dd-8931-4064-b3ca-fd19bbe87110' };
        formData.append('payload', JSON.stringify(receiver));
        images.forEach((image, index) => {
          temp.push({
            uri: image.path,
            type: 'image/jpeg', // Hoặc loại MIME khác tùy thuộc vào định dạng file
            name: `image${index}_${Date.now()}.jpg`, // Đặt tên file sử dụng thời gian hiện tại
          });
        });
        formData.append('files', temp[0]);
        // Thêm các trường dữ liệu khác vào formData nếu cần
        // Gửi formData đến backend
        fetch('http://103.71.96.70:8080/message/send-file', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log('File(s) sent successfully!');
          })
          .catch((error) => console.error('Error:', error));
      })
      .catch((error) => console.error('ImagePicker Error:', error));
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
        <Pressable style={styles.icon} onPress={openImagePicker}>
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
