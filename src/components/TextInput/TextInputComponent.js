/* eslint-disable import/named */
/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { StyleSheet, View, TextInput, Image } from 'react-native';
import React, { useState } from 'react';

export default function TextInputComponent() {
  const [chatInput, setChatInput] = useState('');
  return (
    <View style={styles.searchSection}>
      <TextInput
        accessibilityLabel="Text input field"
        accessibilityHint="Enter your message here"
        style={styles.input}
        placeholder="Nhắn tin"
        onChangeText={(input) => {
          setChatInput(input); // Fixed setting state
        }}
        underlineColorAndroid="transparent"
      />
      <Image style={styles.icon} source={require('../../assets/send.png')} />
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
