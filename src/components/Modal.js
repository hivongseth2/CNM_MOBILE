import React from 'react';
import { Modal, Text, View } from 'react-native';
import { Button } from '@/components'; // Import Button component
import { StyleSheet } from 'react-native';
import { spacing } from '@/theme';
import { useTheme } from '@react-navigation/native';

const CustomModal = ({
  visible,
  message,
  content,
  onBackPress,
  btnBack,
  onVerifyPress,
  btnVefiry,
}) => {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onBackPress}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{message}</Text>
          <Text style={styles.modalText}>{content}</Text>
          <View style={styles.modalButtonContainer}>
            <Button
              onPress={onBackPress} // Ẩn dialog khi chọn "Back"
              style={[styles.modalButton, { backgroundColor: colors.orange }]}
              title={btnBack}
            />
            {onVerifyPress && btnVefiry && (
              <Button
                onPress={onVerifyPress} // Điều hướng tới trang xác nhận khi chọn "Có"
                style={[styles.modalButton, { backgroundColor: colors.green }]}
                title={btnVefiry}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  formContainer: {
    borderRadius: 5,
    padding: spacing.s,
    width: '100%',
  },
  submitButton: {
    marginTop: spacing.m,
    borderWidth: 0,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: spacing.xl,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Màu nền với độ mờ là 50%
  },
  modalContent: {
    backgroundColor: '#333',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    width: '85%', // Chiều rộng của modal
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    width: '40%', // Chiều rộng của nút
    borderWidth: 0,
  },
});
