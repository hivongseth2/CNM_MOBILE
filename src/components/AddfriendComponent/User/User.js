import React, { useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { typography } from '@/theme';
import styles from './UserStyle';
import formatTimeDifference from '@/utils/time';
import { NAVIGATION } from '@/constants';
import ViewProfileModal from '@/components/ViewProfile/ViewProfileModal';

export default function User({ user }) {
  console.log('line 11 ', user);

  const [selectedUser, setSelectedUser] = useState(user);

  const friend = user?.user;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setShowModal(true);
      }}
      // onPress={() => {
      //   navigation.navigate(NAVIGATION.chat, {
      //     srcAvatar: user.avatarUri,
      //     chatContent: chatContent,
      //   });
      // }}
    >
      <View style={styles.containerH}>
        <Image
          style={styles.avatar}
          source={{
            uri: friend.avatarUri,
          }}
        />
        <View style={styles.containerText}>
          <Text style={[typography.name, { color: colors.text }]}>{friend.fullName}</Text>
          <Text
            style={[typography.text, { color: 'gray', maxWidth: 220, width: 220 }]}
            numberOfLines={1}
          >
            {friend.email}
          </Text>
        </View>
      </View>

      <ViewProfileModal
        visible={showModal}
        setVisible={setShowModal}
        user={selectedUser}
      ></ViewProfileModal>

      {/* <Image style={styles.setting} source={require('../../assets/settingBlue.png')}></Image> */}
    </Pressable>
  );
}
