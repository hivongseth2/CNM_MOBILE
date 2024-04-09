import { Modal, Text, View, Image, StyleSheet, Button } from 'react-native';
// import { Button } from '../Button';

export const ConfirmDeleteModal = ({ isVisible, setVisible, onCancel, onConfirm, onDelete }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
          <View style={styles.buttonContainer}>
            <Button onPress={onConfirm} title="Accept" />
            <Button onPress={onDelete} title="Delete" />
            <Button onPress={() => setVisible(false)} title="Cancel" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});
