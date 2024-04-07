import React from 'react';
import { Modal, Text, View } from 'react-native';
import { Button } from '@/components'; // Import Button component
import { StyleSheet } from 'react-native';
import { spacing } from '@/theme';
import { useTheme } from '@react-navigation/native';

const ModalOption = ({
  visible,
  contentOption1,
  onPressOption1,
  contentOption2,
  onPressOption2,
  onRequestClose
}) => {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} animationType="fade" transparent={true}  onRequestClose={onRequestClose}
    
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
       
          <View style={styles.modalButtonContainer}>
            <Button
              onPress={onPressOption1} // Xử lý khi chọn "Thêm bạn"
              style={[styles.modalButton, { backgroundColor: colors.green }]}
              title={contentOption1}
            />
            <Button
              onPress={onPressOption2} // Xử lý khi chọn "Tạo nhóm"
              style={[styles.modalButton, { backgroundColor: colors.green }]}
              title={contentOption2}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
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
    flexDirection:"column",
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Màu nền với độ mờ là 50%
  },
  modalContent: {
    backgroundColor: '#333',
    justifyContent: 'center',

    flexDirection:"column",
    padding: 10,
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
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
 
  },
  modalButton: {
    width: '100%', // Chiều rộng của nút
    borderWidth: 0,
    padding:10,
    margin:10
  },
});
