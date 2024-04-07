import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login, TYPES } from '@/actions/UserActions';
import { Button, ErrorView, TextField } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Login/Login.styles';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { shadow, typography } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { routes } from '@/controllers/routes';
import { NAVIGATION } from '@/constants';
import { getUser } from '@/selectors/UserSelectors';
import CustomModal from '@/components/Modal';

export function Login() {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((state) => errorsSelector([TYPES.LOGIN], state), shallowEqual);
  const [showDialog, setShowDialog] = useState(false);

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.LOGIN], state));

  const navigation = useNavigation();

  const handleSubmit = async () => {
    const rs = await dispatch(login(email, password)).then((data) => {
      if (data?.errorCode === 401) {
        setShowDialog(true);
      }
    });
   
    if (errors[0]?.errorCode === 401 || rs?.errorCode === 401) {
      // navigation.navigate(NAVIGATION.verification, { email: email });
      setShowDialog(true);
    }
  };
  const handleRegister = () => {
    navigation.navigate(NAVIGATION.register);
  };
  const handleVerification = () => {
    // Ẩn dialog
    setShowDialog(false);
    // Điều hướng tới trang xác nhận
    navigation.navigate(NAVIGATION.verification, { email: email });
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://cryptologos.cc/logos/chatcoin-chat-logo.png',
        }}
      ></Image>
      <View style={[styles.formContainer, shadow.primary, { backgroundColor: colors.primary }]}>
        <Text style={[typography.title, styles.title, { color: colors.text }]}>LOGIN</Text>
        <TextField
          autoCapitalize="none"
          accessibilityHint={strings.login.usernameHint}
          accessibilityLabel={strings.login.username}
          onChangeText={setEmail}
          placeholder={strings.login.username}
          value={email}
        />
        <TextField
          secureTextEntry
          accessibilityHint={strings.login.passwordHint}
          accessibilityLabel={strings.login.password}
          autoCapitalize="none"
          onChangeText={setPassword}
          placeholder={strings.login.password}
          textContentType="password"
          value={password}
        />
        <ErrorView errors={[errors[0]?.message]} />
        <Button
          onPress={handleSubmit}
          style={[styles.submitButton, { backgroundColor: colors.blue, borderWidth: 0 }]}
          title={isLoading ? strings.common.loading : strings.login.button}
        />
        <Button
          onPress={handleRegister}
          style={[styles.submitButton, { backgroundColor: colors.orange, borderWidth: 0 }]}
          title={isLoading ? strings.common.loading : strings.login.btnReg}
        />
      </View>

      {/* <Modal
        visible={showDialog}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowDialog(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{errors[0]?.message}</Text>
            <Text style={styles.modalText}>{strings.login.exist}</Text>
            <View style={styles.modalButtonContainer}>
              <Button
                onPress={() => setShowDialog(false)} // Ẩn dialog khi chọn "Back"
                style={styles.modalButton}
                title="Back"
              />
              <Button
                onPress={handleVerification} // Điều hướng tới trang xác nhận khi chọn "Có"
                style={styles.modalButton}
                title="Vertify"
              />
            </View>
          </View>
        </View>
      </Modal> */}

      <CustomModal
        visible={showDialog}
        message={errors[0]?.message}
        content={strings.login.exist}
        btnBack={'Back'}
        onBackPress={() => setShowDialog(false)} // Thay đổi ở đây
        btnVefiry={'Vefiry'}
        onVerifyPress={handleVerification}
      />
    </View>
  );
}
