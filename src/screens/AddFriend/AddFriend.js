import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/actions/UserActions';
import { Button, TextField } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/AddFriend/AddFriendStyle';
import { typography } from '@/theme';
import { getUser } from '@/selectors/UserSelectors';
import { SearchIcon } from '@/assets/svg/Icon';
import ButtonIcon from '@/components/ButtonIcon';
import { getFriend } from '@/selectors/FriendSelector';
import { SearchByEmail, deleteStore } from '@/actions/FriendAction';
import User from '@/components/AddfriendComponent/User/User';

export function AddFriend() {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const friend = useSelector(getFriend);
  const [search, setSearch] = useState('');

  const logoutUser = () => {
    dispatch(logout());
  };
  // useEffect(() => {
  //   console.log('friend helo hlosaijdiasidjasjijdsia', friend.payload.user);
  // }, [friend]);

  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          flexDirection: 'column',
          alignItems: 'flex-start',
          height: 300,

          justifyContent: 'flex-start',
        },
      ]}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          width: 320,
          height: 50,
        }}
      >
        <TextField
          value={search}
          changeValue={setSearch}
          style={[styles.textField, { borderColor: colors.text }]}
          placeholder="Tìm kiếm bạn bè"
          styleContainer={{
            backgroundColor: colors.background,
            width: 280,
            height: 40,
            borderBottomW: 5,
          }}
        />

        <ButtonIcon
          onPress={() => {
            dispatch(SearchByEmail(search));
          }}
          style={{ borderColor: colors.border, marginTop: 20 }}
          small
          icon={<SearchIcon width={30} height={30} />}
        ></ButtonIcon>
      </View>
      {friend && friend?.payload?.user && <User user={friend.payload.user}></User>}
    </View>
  );
}
