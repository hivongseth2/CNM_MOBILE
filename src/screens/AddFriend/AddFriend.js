import { useTheme } from '@react-navigation/native';
import React from 'react';
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

export function AddFriend() {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const logoutUser = () => {
    dispatch(logout());
  };

 

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
         flexDirection:"row",
          width: 320,
          height:50
        }}
      >
        <TextField style={[styles.textField,{borderColor:colors.text}]} placeholder="Tìm kiếm bạn bè" styleContainer={{backgroundColor:colors.background, width:280,height:40, borderBottomW:5}} />

       <ButtonIcon
       
            style={{ borderColor: colors.border,marginTop:20 }}
            small
          icon={<SearchIcon width={30} height={ 30} />}
          ></ButtonIcon>
      </View>

      {/* <Button title={strings.profile.logout} onPress={logoutUser} /> */}
    </View>
  );
}
