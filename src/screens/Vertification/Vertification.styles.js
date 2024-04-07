import { StyleSheet } from 'react-native';
import { spacing } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  codeInput: {
    width: 40, // Điều chỉnh kích thước của hình vuông nhập mã xác nhận
    height: 40, // Điều chỉnh kích thước của hình vuông nhập mã xác nhận
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginHorizontal: 5, // Khoảng cách giữa các hình vuông nhập mã xác nhận
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold', // Để text ở giữa hình vuông
  },
});
