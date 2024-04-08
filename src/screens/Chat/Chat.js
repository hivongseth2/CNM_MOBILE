import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { strings } from '@/localization';

import React, { useEffect, useState } from 'react';
import Message from '@/components/Message/Message';
import { useRoute, useTheme } from '@react-navigation/native';
import { TextField } from '@/components';
import TextInputComponent from '@/components/TextInput/TextInputComponent';
import { getUser } from '@/selectors/UserSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageAction } from '@/actions/MessengerAction';
import io from 'socket.io-client';

export default function Chat() {
  const route = useRoute(); // Sử dụng hook useRoute để truy cập route.params
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const user = useSelector(getUser);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const srcAvatar = route.params.srcAvatar;

  const dispatch = useDispatch();

  const [chatContent, setChatContent] = useState(route.params.content);

  useEffect(() => {
    // Connect to the server
    const newSocket = io('http://103.71.96.70:8080/ws', {
      transports: ['websocket'], // Use WebSocket transport
      auth: {
        // Provide login credentials
        username: user.email,
        password: '123123', // Password can be hard-coded or fetched dynamically
      },
    });

    newSocket.on('connect', () => {
      console.log('Connected to the server');
      // Subscribe to the messages for the user
      newSocket.on(`/user/${user.userId}/queue/messages`, (message) => {
        console.log('Message received', message);
        // Handle the received message
      });
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    setSocket(newSocket);

    // Clean up on component unmount
    return () => newSocket.close();
  }, []);

  const sendText = () => {
    console.log('loi');
    dispatch(
      sendMessageAction({ receiverId: '721b8305-5b09-466d-80b9-79eb4e98121f', content: message })
    );
  };
  const sendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', {
        receiverId: '721b8305-5b09-466d-80b9-79eb4e98121f',
        message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          {chatContent.messages.map((message, index) => (
            <Message
              key={index}
              isOwn={user.userId === message.sender.userId}
              message={message.content}
              srcAvatar={srcAvatar}
            />
          ))}
        </View>
      </ScrollView>

      <TextInputComponent message={message} setMessage={setMessage} sendMessage={sendText} />
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
});
