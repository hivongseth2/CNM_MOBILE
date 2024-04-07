import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifyCode, TYPES, GenCode } from '@/actions/UserActions'; // Chỉnh sửa import action tương ứng
import { Button, ErrorView } from '@/components';
import { strings } from '@/localization';

import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { shadow } from '@/theme';
import { NAVIGATION } from '@/constants';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { styles } from './Vertification.styles';
import Notification from '@/components/Notification/Notification';
import CustomModal from '@/components/Modal';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Verification() {
  const route = useRoute();
  const { email } = route.params;
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const [code, setCode] = useState(Array(6).fill(''));
  const [errors, setError] = useState(null); // Chỉnh sửa TYPES và selector tương ứng
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.VERIFY_CODE], state)); // Chỉnh sửa TYPES và selector tương ứng
  const navigation = useNavigation();
  const [resendTime, setResendTime] = useState(90);
  const [intervalId, setIntervalId] = useState(null); // Sử dụng để lưu ID của interval
  const [showMessage, setShowMessage] = useState(false);
  const [status, setStatus] = useState(false);
  const inputRefs = useRef([]); // Mảng lưu trữ ref của các TextInput

  useEffect(() => {
    dispatch(GenCode(email));

    setShowMessage(true);
    startCountdown();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const startResendTimeCountdown = () => {
    const id = setInterval(() => {
      setResendTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(id); // Dừng interval nếu prevTime = 0
          return prevTime; // Trả về prevTime để giữ nguyên giá trị
        } else {
          return prevTime - 1; // Giảm thời gian đếm ngược mỗi giây
        }
      });
    }, 1000);
    setIntervalId(id);
  };

  const startCountdown = () => {
    startResendTimeCountdown();
  };

  const reSendCode = () => {
    if (resendTime > 0) {
      return;
    }
    dispatch(GenCode(email));

    setShowMessage(true);
    setResendTime(90);
    // startCountdown();
  };

  const handleSubmit = async () => {
    const verificationCode = code.join('');
    console.log(verificationCode);
    const data = await dispatch(verifyCode(email, verificationCode));

    if (data?.errorCode) {
      console.log(data);
      setError(data?.message);
    }
    if (data.statusCode) {
      setStatus(true);
      setShowMessage(true);
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const focusNextInput = (index) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const focusPrevInput = (index) => {
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={[styles.formContainer, shadow.primary, { backgroundColor: colors.card }]}>
          <Text style={styles.title}>{strings.verification.title}</Text>
          <View style={styles.codeContainer}>
            {code.map((value, index) => (
              <TextInput
                key={index}
                style={[styles.codeInput, { borderColor: colors.gray }]}
                maxLength={1}
                keyboardType="numeric"
                value={value}
                onChangeText={(text) => {
                  const newCode = [...code];
                  newCode[index] = text;
                  setCode(newCode);
                  if (text.length === 1) {
                    focusNextInput(index); // Chuyển focus sang ô input tiếp theo khi đã nhập xong
                  }
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    focusPrevInput(index); // Chuyển focus sang ô input trước đó khi bấm nút xóa
                  }
                }}
                ref={(ref) => (inputRefs.current[index] = ref)} // Lưu ref vào mảng
                onSubmitEditing={() => focusNextInput(index)} // Xử lý khi nhấn Enter trên bàn phím
              />
            ))}
          </View>

          {errors != null && <ErrorView errors={[errors]} />}
          <Button
            onPress={handleSubmit}
            style={[styles.submitButton, { backgroundColor: colors.blue }]}
            title={isLoading ? strings.common.loading : strings.verification.button}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <Button
            onPress={navigateBack}
            style={[styles.submitButton, { backgroundColor: colors.orange }]}
            title={isLoading ? strings.common.loading : strings.verification.back}
            small={true}
          />

          <Button
            disabled={resendTime > 0} // Vô hiệu hóa nút khi resendTime vẫn còn lớn hơn 0
            onPress={reSendCode}
            style={[
              styles.submitButton,
              { backgroundColor: resendTime > 0 ? colors.gray : colors.primary },
            ]} // Thay đổi màu nút khi resendTime > 0}
            title={
              isLoading
                ? strings.common.loading
                : resendTime !== 0
                ? resendTime
                : strings.verification.reload
            }
            textStyle={{ color: resendTime > 0 ? '#A9A9A9' : colors.text }}
            small={true}
          />
        </View>

        <CustomModal
          visible={showMessage}
          message={'Notification'}
          content={status ? strings.verification.success : strings.verification.resend}
          btnBack={'OK'}
          onBackPress={() => {
            {
              !status ? setShowMessage(false) : navigation.navigate(NAVIGATION.login);
            }
          }} // Thay đổi ở đây
          btnVefiry={null}
          onVerifyPress={null}
        />

        {/* {showMessage && (
        <Notification
          message={status ? strings.verification.success : strings.verification.resend}
          actionText="OK"
          onActionPress={() => {
            {
              !status ? setShowMessage(false) : navigation.navigate(NAVIGATION.login);
            }
          }}
        ></Notification>
      )} */}
      </View>
    </ScrollView>
  );
}
