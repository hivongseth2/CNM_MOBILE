import React, { useState } from 'react';

import { Modal, Text, View, Image, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { Button } from '@/components';
import { spacing, typography } from '@/theme';
import ButtonIcon from '../ButtonIcon';
import { CloseIcon, SearchIcon } from '@/assets/svg/Icon';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { set } from 'react-native-reanimated';
import { getListMessenges } from '@/selectors/MessengesSelector';
import { NAVIGATION } from '@/constants';
import { useSelector } from 'react-redux';
import { getConversationByUser } from '@/utils/conversationUtil';
import { getFriend } from '@/selectors/FriendSelector';

export default function ViewProfileModal(props) {
  const navigation = useNavigation();
  const listMess = useSelector(getListMessenges);

  const friend = useSelector(getFriend);
  console.log('friend ', friend);

  // console.log('props ', props);
  const { visible, setVisible, user } = props;

  //   console.log(user);

  const userInfo = friend.payload.user;
  const [userData, setUserData] = useState(userInfo);

  const [showModalRespond, setShowModalRespond] = useState(false);

  const { colors } = useTheme();

  const handleShowSelection = () => {
    setShowModalRespond(true);
  };
  const handleAddFriendButton = () => {
    setUserData({ ...userData, sent: true });
  };

  const handleCancelRequest = () => {
    setUserData({ ...userData, sent: false });
  };

  const handleRespondRequest = (isAccept) => {
    if (isAccept) setUserData({ ...userData, received: false, friend: true });
    else setUserData({ ...userData, received: false });
    setShowModalRespond(false);
  };

  const handleMessage = () => {
    const conversationFinded = getConversationByUser(listMess, user);
    console.log('55VPM', conversationFinded);

    navigation.navigate(NAVIGATION.chat, {
      content: conversationFinded,
    });
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.wapper}>
        <View style={styles.container}>
          <ButtonIcon
            style={{
              // backgroundColor: 'white',
              position: 'absolute',
              right: 15,
              top: 15,
              width: 40,
            }}
            small
            onPress={() => {
              setVisible(false);
            }}
            icon={<CloseIcon width={30} height={30} color={colors.red} />}
          ></ButtonIcon>
          <View style={styles.infoWrapper}>
            <Image
              style={styles.avatar}
              source={{
                uri:
                  userData.user.avatarUri ||
                  'https://kenh14cdn.com/thumb_w/660/2020/5/28/0-1590653959375414280410.jpg',
              }}
            />
            <Text style={{ ...typography.title }}>{userInfo.user.fullName}</Text>
          </View>
          <View style={styles.action}>
            {userData.sent ? (
              <Button style={styles.button} onPress={handleCancelRequest} title="Cancel"></Button>
            ) : userData.received ? (
              <Button style={styles.button} onPress={handleShowSelection} title="Response"></Button>
            ) : userData.friend ? (
              <Button style={styles.button} title="Friend"></Button>
            ) : (
              <Button
                style={styles.button}
                onPress={handleAddFriendButton}
                title="Add friend"
              ></Button>
            )}

            <Button onPress={handleMessage} title="Message" style={styles.button} />
          </View>
          <View style={styles.infomation}>
            <InfoWrapper label="Email" value={userInfo.user.email} />
            <InfoWrapper label="Birthday" value={userInfo.user.dateOfBirth} />
            <InfoWrapper label="Phone" value={userInfo.user.phone} />
          </View>
        </View>
      </View>
      <ConfirmDeleteModal
        isVisible={showModalRespond}
        setVisible={setShowModalRespond}
        onConfirm={() => handleRespondRequest(true)}
        onDelete={() => handleRespondRequest(false)}
      ></ConfirmDeleteModal>
    </Modal>
  );
}

const InfoWrapper = (props) => {
  const { label, value } = props;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ ...typography.title, marginRight: 10 }}>{label}</Text>
      <Text style={typography.text}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '60%',
    backgroundColor: 'gray',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    padding: 20,
    borderRadius: 30,
  },
  infoWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 100, height: 100, objectFit: 'contains', borderRadius: 200, marginRight: 20 },
  name: {},
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: { width: '40%' },
  modalButton: {
    width: '10%',
    borderWidth: 0,
  },
});
