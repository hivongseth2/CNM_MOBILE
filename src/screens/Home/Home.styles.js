import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Style để căn giữa theo chiều dọc và chiều ngang
  leftContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  // Style để căn giữa theo chiều ngang
  centerHorizontal: {
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    // flexDirection: 'row',
  },
  leftHorizontal: {
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    height: 60,

    flexDirection: 'row',
  },
  // Style để căn giữa theo chiều dọc
  centerVertical: {
    justifyContent: 'center',
  },

  // Style để căn trái
  alignLeft: {
    alignItems: 'flex-start',
  },

  // Style để căn phải
  alignRight: {
    alignItems: 'flex-end',
  },

  // Style để căn lề trái
  marginLeft: {
    marginLeft: 10,
  },

  // Style để căn lề phải
  marginRight: {
    marginRight: 10,
  },

  // Style để căn lề trên
  marginTop: {
    marginTop: 10,
  },

  // Style để căn lề dưới
  marginBottom: {
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  textField: {
    width: 320,
    height: 50,
    padding: 10,
    color: 'white',
    borderBottomColor: 'transparent', // Ẩn border dưới
    borderBottomWidth: 1, // Đặt độ rộng border dưới
    borderBottomColor: '#CCCC',
  },
});
