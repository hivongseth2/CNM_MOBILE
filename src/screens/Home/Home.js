import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState, useFocusEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Config } from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import { strings } from '@/localization';
import { getUser } from '@/selectors/UserSelectors';
import { styles } from '@/screens/Home/Home.styles';
import { typography } from '@/theme';
import { Button, TextField } from '@/components';
import UserV from '@/components/UserV/UserV';
import usersData from '@/mocks/usersData';
import UserChat from '@/components/UserChat/UserChat';
import { ButtonIcon } from '@/components/ButtonIcon';
import { AddfrIcon } from '@/assets/svg/Icon';
import ModalOption from '@/components/HomeComponent/ModalOption';
import { NAVIGATION } from '@/constants';
import { getListFriend } from '@/selectors/FriendSelector';
import { getAllFriend } from '@/actions/ListFriendAction';
import { getListMessenges } from '@/selectors/MessengesSelector';
import { getAllMessenger } from '@/actions/MessengerAction';

export function Home() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const user = useSelector(getUser);
  const [search, setSearch] = useState('');
  const [users, setUsername] = useState(usersData);
  const [modalState, setModalState] = useState(false);
  // const user = useSelector(getUser);
  const dispatch = useDispatch();
  const listFriend = useSelector(getListFriend);
  const listMess = useSelector(getListMessenges);
  useEffect(() => {
    console.log('messenger128372137721893712', listMess);
  }, [listMess]);

  useEffect(() => {
    dispatch(getAllFriend());
    dispatch(getAllMessenger());
  }, [dispatch]);

  const closeModal = () => {
    setModalState(false);
  };

  const moveToAddFrPage = () => {
    navigation.navigate(NAVIGATION.addfriend);
    closeModal();
  };
  const createGroup = () => {
    console.log('hi');
  };

  // useEffect(() => {console.log(modalState); }, [modalState])

  return (
    <View style={[styles.leftContainer, { marginLeft: 5 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TextField
            style={styles.textField}
            autoCapitalize="none"
            accessibilityHint={strings.chat.search}
            accessibilityLabel={strings.chat.search}
            onChangeText={setSearch}
            placeholder={strings.chat.search}
            value={search}
          />

          <ButtonIcon
            onPress={() => {
              setModalState(true);
            }}
            style={{ borderColor: colors.blue }}
            small
            icon={<AddfrIcon color={colors.blueLight} />}
          ></ButtonIcon>
        </View>

        <ScrollView style={[styles.leftHorizontal, { height: 100 }]} horizontal>
          {listFriend?.map((user) => (
            <UserV key={user.userId} name={user.fullName} srcAvatar={user.avatarUri} />
          ))}
        </ScrollView>
        {listMess.map((user) => (
          <UserChat
            key={user.id}
            id={user.id}
            name={user.participants[0].fullName}
            srcAvatar={user.participants[0].avatarUri}
            chatContent={user.lastMessage.content}
            time={user.lastMessage.timestamp}
          />
        ))}
      </ScrollView>

      <ModalOption
        visible={modalState}
        onRequestClose={closeModal}
        contentOption1={strings.home.addFriend}
        onPressOption1={moveToAddFrPage}
        contentOption2={strings.home.createGroup}
        onPressOption2={createGroup}
      />
    </View>
  );
}
