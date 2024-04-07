import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState, useFocusEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Config } from 'react-native-config';
import { useSelector } from 'react-redux';
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

export function Home() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const user = useSelector(getUser);
  const [search, setSearch] = useState('');
  const [users, setUsername] = useState(usersData);
  const [modalState,setModalState] = useState(false)
  // const user = useSelector(getUser);


  const closeModal = ()=>
  {
    setModalState(false)
  }

  const moveToAddFrPage = ()=>
  {
    navigation.navigate(NAVIGATION.addfriend)
    closeModal()
  }
  const createGroup = () =>
  {
    console.log("hi");
  }
  
  // useEffect(() => {console.log(modalState); }, [modalState])

  return (
    <View style={styles.leftContainer}>
      <ScrollView>
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
          onPress={()=>{
              setModalState(true)  
          }}
            style={{ borderColor: colors.blue }}
            small
            icon={<AddfrIcon color={colors.blueLight} />}
          ></ButtonIcon>
        </View>

        <ScrollView style={[styles.leftHorizontal, { height: 100 }]} horizontal>
          {users.map((user) => (
            <UserV key={user.id} name={user.name} srcAvatar={user.avatar} />
          ))}
        </ScrollView>
        {users.map((user) => (
          <UserChat
            key={user.id}

            name={user.name}
            srcAvatar={user.avatar}
            chatContent={user.chatContent}
          />
        ))}
      </ScrollView>


      <ModalOption visible={modalState} onRequestClose={closeModal} contentOption1={strings.home.addFriend} onPressOption1={moveToAddFrPage}  contentOption2={strings.home.createGroup} onPressOption2={createGroup} />
    
    
    </View>
  );
}
