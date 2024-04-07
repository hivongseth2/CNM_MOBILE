import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { strings } from '@/localization';

import React, { useState } from 'react';
import Message from '@/components/Message/Message';
import { useRoute, useTheme } from '@react-navigation/native';
import { TextField } from '@/components';
import TextInputComponent from '@/components/TextInput/TextInputComponent';
import { getUser } from '@/selectors/UserSelectors';
import { useDispatch, useSelector } from 'react-redux';

export default function Chat() {
  const route = useRoute(); // Sử dụng hook useRoute để truy cập route.params
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const user = useSelector(getUser);

  console.log('useeeeeeeeeeeeeeeeee', user);
  const srcAvatar = route.params.srcAvatar;

  const [chatContent, setChatContent] = useState(route.params.content);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          {chatContent.messages.map((message, index) => (
            // <Message key={index} isOwn={message.sender === 'You'} message={message.content} />
            <Message
              key={index}
              isOwn={user.userId === message.sender.userId}
              message={message.content}
              srcAvatar={srcAvatar}
            />
          ))}
        </View>
      </ScrollView>

      {/* <TextInput
        placeholder="Nhắn tin"
        style={styles.textField}
        inlineImageRight={
          'https://kenh14cdn.com/thumb_w/660/2020/5/28/0-1590653959375414280410.jpg'
        }
      ></TextInput> */}
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
});
