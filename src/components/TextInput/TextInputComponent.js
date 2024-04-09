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

  // const openImagePicker = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     maxWidth: 300,
  //     maxHeight: 300,
  //     includeBase64: false,
  //     multiple: true, // Đặt multiple thành true để chọn nhiều ảnh
  //   };

  //   launchImageLibrary(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       // Xử lý hình ảnh được chọn ở đây
  //       // Ví dụ: setMessage(response.uri);
  //       console.log(response);
  //     }
  //   });
  // };
  // const openImagePicker = () => {
  //   ImagePicker.openPicker({
  //     multiple: true, // Chọn nhiều ảnh
  //     mediaType: 'photo',
  //   })
  //     .then((images) => {
  //       console.log(images);
  //       // Xử lý các ảnh được chọn ở đây
  //       // Ví dụ: setMessage(images.map(image => image.path).join(', '));
  //     })
  //     .catch((error) => {
  //       console.log('ImagePicker Error: ', error);
  //     });
  // };
  /////////////////////cai này
  // const openImagePicker = () => {
  //   ImagePicker.openPicker({
  //     multiple: true, // Chọn nhiều ảnh
  //     mediaType: 'photo',
  //   })
  //     .then((images) => {
  //       console.log(images);
  //       setSelectedImages(images);
  //       uploadImagesToServer();
  //     })
  //     .catch((error) => {
  //       console.log('ImagePicker Error: ', error);
  //     });
  // };

  const openImagePicker = () => {
    const temp = [];
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((images) => {
        // Tạo một đối tượng FormData mới
        const formData = new FormData();
        const receiver = { receiverId: '4eb675dd-8931-4064-b3ca-fd19bbe87110' };
        formData.append('payload', JSON.stringify(receiver));

        // Thêm mỗi ảnh vào formData

        images.forEach((image, index) => {
          temp.push({
            uri: image.path,
            type: 'image/jpeg', // Hoặc loại MIME khác tùy thuộc vào định dạng file
            name: `image${index}.jpg`, // Đặt tên file
          });
        });
        formData.append('files', JSON.stringify(temp));
        console.log('--------------------------------', formData);

        // Tạo một HTTP POST request để gửi file
        fetch('http://103.71.96.70:8080/message/send-file', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.log('Error:', error));
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };
  // const uploadImagesToServer = () => {
  //   // Tạo một mảng files từ selectedImages
  //   const files = selectedImages.map((image, index) => ({
  //     uri: image.path,
  //     type: image.mime,
  //     name: image.filename || `photo_${index}.jpg`,
  //   }));

  //   const receiver = { receiverId: '4eb675dd-8931-4064-b3ca-fd19bbe87110' };

  //   const formData = new FormData();
  //   formData.append('files', item);
  //   formData.append('payload', receiver);

  //   console.log('form data', formData);

  //   dispatch(sendFileAction(formData));
  // };

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
