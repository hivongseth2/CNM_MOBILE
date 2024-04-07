import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register, TYPES } from '@/actions/UserActions';
import { Button, ErrorView, TextField } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Register/Register.styles';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { shadow, typography } from '@/theme';
import { NAVIGATION } from '@/constants';
import { useNavigation, useTheme } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment'; // Import Moment.js
import Notification from '@/components/Notification/Notification';
import CustomModal from '@/components/Modal';

export default function Register() {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((state) => errorsSelector([TYPES.REGISTER], state));
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.REGISTER], state));
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [showTrue, setShowTrue] = useState(false);
  const [showFalse, setShowFalse] = useState(false);
  const [message, setMessage] = useState('');
  const [exist, setExist] = useState(false);
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const navigateVerti = () => {
    setShowTrue(false);
    setShowFalse(false);
    navigation.navigate(NAVIGATION.verification, { email: email });
  };
  const handleSubmit = async () => {
    const dateOfBirth = moment(date).format('YYYY-MM-DD');

    if ((fullName, phone, dateOfBirth, email, password === '')) {
      console.log('????', fullName, phone, dateOfBirth, email, password);
      setMessage('Please fill in all fields');
      setShowFalse(true);
      return;
    }

    const data = await dispatch(register(fullName, phone, dateOfBirth, email, password));
    console.log(data);
    if (data?.errorCode) {
      if (data.errorCode === 400) {
        console.log('data', data);
        console.log(fullName, phone, dateOfBirth, email, password);
        setMessage(data.message);
        setExist(true);
      }
      setMessage(data.message);

      setShowFalse(true);
    }
    if (data?.statusCode === 200) {
      setMessage(data?.message);

      setShowTrue(true);
    }

    // ;
  };

  const navigateLogin = () => {
    navigation.navigate(NAVIGATION.login);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={[styles.formContainer, shadow.primary, { backgroundColor: colors.card }]}>
          <View style={[styles.formContainer, shadow.light, { backgroundColor: colors.primary }]}>
            <Text style={[typography.title, styles.title, { color: colors.text }]}>REGISTER</Text>

            <TextField
              onChangeText={setFullName}
              placeholder={strings.register.fullName}
              value={fullName}
            />
            <TextField onChangeText={setPhone} placeholder={strings.register.phone} value={phone} />
            {/* <Text style={styles.dateOfBirth}>{strings.register.dateOfBirth}</Text> */}

            <TouchableOpacity
              onPress={() => setOpen(true)}
              hitSlop={{ top: 30, bottom: 50, left: 20, right: 30 }} // Mở rộng 10 điểm ảnh từ mỗi phía
            >
              <View>
                <TextField
                  placeholder={strings.register.dateOfBirth}
                  value={moment(date).format('YYYY-MM-DD').toString()}
                  editable={false} // Vô hiệu hóa TextField
                />
              </View>
              <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                  setOpen(false);
                  setDate(date);
                  handleDateChange(date); // Gọi hàm handleDateChange khi người dùng chọn ngày
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </TouchableOpacity>

            <TextField onChangeText={setEmail} placeholder={strings.register.email} value={email} />
            <TextField
              onChangeText={setPassword}
              placeholder={strings.register.password}
              value={password}
              secureTextEntry
            />
            <ErrorView errors={errors} />
            <Button
              onPress={handleSubmit}
              style={[styles.submitButton, { backgroundColor: colors.orange, borderWidth: 0 }]}
              title={isLoading ? strings.common.loading : strings.register.button}
            />
            <Button
              onPress={navigateLogin}
              style={[styles.submitButton, { backgroundColor: colors.blue, borderWidth: 0 }]}
              title={isLoading ? strings.common.loading : strings.login.button}
            />
          </View>
        </View>

        <CustomModal
          visible={showFalse}
          message={'Notification'}
          content={message}
          btnBack={'Back'}
          onBackPress={() => setShowFalse(false)} // Thay đổi ở đây
          btnVefiry={null}
          onVerifyPress={null}
        />

        <CustomModal
          visible={showTrue}
          message={'Notification'}
          content={message}
          btnBack={'Back'}
          onBackPress={() => setShowTrue(false)} // Thay đổi ở đây
          btnVefiry={'Vefiry'}
          onVerifyPress={() => {
            navigateVerti();
          }}
        />
      </View>
    </ScrollView>
  );
}
