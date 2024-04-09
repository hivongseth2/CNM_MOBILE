import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Pressable,
  TouchableOpacity,
  Button,
} from 'react-native';
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
import { Modal, ModalButton, ModalContent, ModalFooter, SlideAnimation } from 'react-native-modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeartIcon } from '@/assets/svg/Icon';
import CustomModal from '@/components/Modal';
export function DoubleTap({ onDoubleTap, onLongPress, children }) {
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

  return (
    <Pressable onPressIn={handlePressIn} onLongPress={onLongPress}>
      {children}
    </Pressable>
  );
}

export default function Chat() {
  const route = useRoute(); // Sử dụng hook useRoute để truy cập route.params
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const user = useSelector(getUser);
  const [message, setMessage] = useState('');
  const srcAvatar = route.params.srcAvatar;
  const [editId, setEditId] = useState(null);
  const [messageData, setMessageData] = useState(route.params.content);
  const dispatch = useDispatch();
  const listMess = useSelector(getListMessenges);

  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [scaleAnimation] = useState(new Animated.Value(1));
  const conversationId = messageData.id;

  useEffect(() => {
    const foundMessage = listMess.find((message) => message.id === messageData.id);
    if (foundMessage) {
      setMessageData(foundMessage);
    }
  }, [listMess, messageData.id]);

  const scrollViewRef = useRef(null);

  const ReCallMessage = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://103.71.96.70:8080/message/recall-message', {
      method: 'POST',
      body: JSON.stringify({
        conversationId: conversationId,
        messageId: editId,
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
        handleCloseModal();
        setEditId(null);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleScroll = async (event) => {
    // Lấy vị trí hiện tại của scroll
    const { contentOffset } = event.nativeEvent;
    const currentScrollY = contentOffset.y;

    // Kiểm tra nếu scroll tới đầu trang
    if (currentScrollY === 0) {
      const token = await AsyncStorage.getItem('token');

      // fetch('http://103.71.96.70:8080/message/get-more', {
      //   method: 'GET',
      //   body: JSON.stringify({
      //     conversationId: conversationId,
      //     messageId: messageData.messages[messageData.messages.length - 1],
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok', response);
      //     }
      //     console.log('get more successs', response);
      //   })
      //   .catch((error) => console.error('Error:', error));

      console.log(
        '======================',
        messageData.messages[messageData.messages.length - 2],
        conversationId
      );
    }
  };

  const handleLongPress = (index, editId) => {
    setSelectedMessageIndex(index);
    setEditId(editId);

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
    setModalVisible(false);
  };

  const reactMessageFetch = async (messageId) => {
    const token = await AsyncStorage.getItem('token');
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

  return (
    <View style={styles.container}>
      <Modal
        width={240}
        height={300}
        modalStyle={{ backgroundColor: 'transparent', flex: 1, marginTop: 300 }}
        animationDuration={100}
        swipeDirection={['up', 'down']}
        swipeThreshold={0} // default 100
        useNativeDriver={true}
        
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
        footer={
          <ModalFooter>
            <ModalButton
              text="CANCEL"
              onPress={() => {
                handleCloseModal();
                setEditId(null);
              }}
            />
            <ModalButton text="OK" onPress={() => {}} />
          </ModalFooter>
        }
      >
        <ModalContent>
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

          <Button
            hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}
            width="400"
            height={100}
            useNativeDriver={true}
            style={{
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 100,
              zIndex: 300,
              backgroundColor: colors.blue,
              marginTop: 20,
            }}
            title="Re call"
            onPress={ReCallMessage}
          ></Button>
        </ModalContent>
      </Modal>
      <ScrollView ref={scrollViewRef} onScroll={handleScroll}>
        <View style={[styles.container, { flexDirection: 'column-reverse' }]}>
          {messageData?.messages?.map((message, index) => (
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
                    // uri: message.files.viewUri,
                    uri: 'https://st.quantrimang.com/photos/image/2018/05/25/workplace.jpg',
                  }}
                />
              ) : (
                <DoubleTap
                  onDoubleTap={() => reactMessageFetch(message.id)}
                  onLongPress={() => {
                    handleLongPress(index, message.id);
                  }}
                >
                  <Message
                    isOwn={user.userId === message.sender.userId}
                    message={message.content}
                    srcAvatar={srcAvatar}
                    reactions={message.reactions}
                  />
                </DoubleTap>
              )}
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      <TextInputComponent />
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
