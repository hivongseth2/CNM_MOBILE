import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/actions/UserActions';
import { Button } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Profile/Profile.styles';
import { typography } from '@/theme';
import { getUser } from '@/selectors/UserSelectors';

export function Profile() {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const logoutUser = () => {
    dispatch(logout());
  };

  console.log(user);

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          display: 'flex',
          height: 200,
        }}
      >
        <Text style={[typography.title, styles.title, { color: colors.text }]}>
          {user.fullName}
        </Text>
        <View>
          <Image
            style={styles.avatar}
            source={{
              uri: user?.avatarUri,
            }}
          />
        </View>
        <Text style={[typography.title, styles.title, { color: colors.text }]}>
          {user.dateOfBirth}
        </Text>
      </View>

      <Button title={strings.profile.logout} onPress={logoutUser} />
    </View>
  );
}
