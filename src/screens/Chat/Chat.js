import { Image, ScrollView, StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { strings } from '@/localization';

import React, { useEffect, useState, useRef } from 'react';
import Message from '@/components/Message/Message';
import { useRoute, useTheme } from '@react-navigation/native';
import { TextField } from '@/components';
import TextInputComponent from '@/components/TextInput/TextInputComponent';
import { getUser } from '@/selectors/UserSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageAction } from '@/actions/MessengerAction';
import { getListFriend } from '@/selectors/FriendSelector';
import { getListMessenges } from '@/selectors/MessengesSelector';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Modal, ModalContent, SlideAnimation } from 'react-native-modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeartIcon } from '@/assets/svg/Icon';

export function DoubleTap({ onDoubleTap, children }) {
  const [lastPress, setLastPress] = useState(0);

  const handlePressIn = () => {
    const currentTime = new Date().getTime();
    const delta = currentTime - lastPress;
    if (delta < 300) {
      // Double tap threshold: 300 milliseconds
      onDoubleTap();
    }
    setLastPress(currentTime);
  };

  return <Pressable onPressIn={handlePressIn}>{children}</Pressable>;
}

export default function Chat() {
  const route = useRoute(); // Sử dụng hook useRoute để truy cập route.params
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const user = useSelector(getUser);
  const [message, setMessage] = useState('');
  const srcAvatar = route.params.srcAvatar;
  const [sockets, setSockets] = useState({});
  const [messageData, setMessageData] = useState(route.params.content);
  const dispatch = useDispatch();
  const listMess = useSelector(getListMessenges);

  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [scaleAnimation] = useState(new Animated.Value(1));
  const conversationId = messageData.id;

  useEffect(() => {
    // Cập nhật messageData khi listMess thay đổi
    const foundMessage = listMess.find((message) => message.id === messageData.id);
    if (foundMessage) {
      setMessageData(foundMessage);
    }
  }, [listMess, messageData.id]);

  const handleLongPress = (index) => {
    setSelectedMessageIndex(index); // Lưu index của item được chọn
    Animated.timing(scaleAnimation, {
      toValue: 1.1,
      duration: 100,
      easing: Easing.circle,
      useNativeDriver: true,
    }).start();
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 200,
      easing: Easing.sin,
      useNativeDriver: true,
    }).start();
    // setModalVisible(false);
  };

  const reactMessageFetch = async (messageId) => {
    const token = await AsyncStorage.getItem('token');
    reactType = 'Heart';

    console.log(conversationId, messageId, 'Heart');

    fetch('http://103.71.96.70:8080/message/react-message', {
      method: 'POST',
      body: JSON.stringify({
        conversationId: conversationId,
        messageId: messageId,
        reactType: 'HEART',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok', response);
        }
        console.log('File(s) sent successfully!');
      })
      .catch((error) => console.error('Error:', error));
  };

  const sendText = () => {
    dispatch(
      sendMessageAction({ receiverId: '721b8305-5b09-466d-80b9-79eb4e98121f', content: message })
    );
    setMessage('');
  };
  const sendMessage = (message, userId) => {
    const socket = sockets[userId];
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[styles.container, { flexDirection: 'column-reverse' }]}>
          {messageData?.messages?.map((message, index) => (
            <Pressable key={index} onLongPress={() => handleLongPress(index)}>
              <Animated.View
                style={[
                  styles.messageContainer,
                  selectedMessageIndex === index && { transform: [{ scale: scaleAnimation }] },
                ]}
              >
                {message.messageType === 'FILE' ? (
                  <Image
                    style={{ height: 300, width: 300 }}
                    source={{
                      uri: message.files.viewUri,
                    }}
                  />
                ) : (
                  <DoubleTap onDoubleTap={() => reactMessageFetch(message.id)}>
                    <Message
                      isOwn={user.userId === message.sender.userId}
                      message={message.content}
                        srcAvatar={srcAvatar}
                        reactions = {message.reactions}
                    />
                  
                  </DoubleTap>
                )}
              </Animated.View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <TextInputComponent />

      <Modal
        width={240}
        height={200}
        modalStyle={{ backgroundColor: 'transparent' }}
        animationDuration={50}
        swipeDirection={['up', 'down']} // can be string or an array
        swipeThreshold={50} // default 100
        onSwipeOut={(event) => {
          setModalVisible(false);
        }}
        visible={isModalVisible}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onDismiss={() => {
          handleCloseModal();
        }}
        onTouchOutside={() => {
          handleCloseModal();
          setModalVisible(false);
        }}
        onSwipingOut={() => {
          handleCloseModal();
        }}
      >
        <ModalContent>
          <View
            style={{
              // flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
            }}
          >
            <Pressable
              style={{
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                width: 200,
                height: 50,
                backgroundColor: colors.red,
              }}
              onPress={() => {
                console.log('action1');
              }}
            >
              <Text>Delete</Text>
            </Pressable>

            <Pressable
              style={{
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                width: 200,
                height: 50,
                backgroundColor: colors.blue,
                marginTop: 20,
              }}
              onPress={() => {
                console.log('action 2');
              }}
            >
              <Text>Re call</Text>
            </Pressable>
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textField: {
    // marginTop: 20,
    // marginBottom: 20,
    borderColor: 'white',
    borderWidth: 1,
    width: 350,

    height: 50,
    borderRadius: 5,
    padding: 10,
    color: 'white',
  },
  pressable: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
