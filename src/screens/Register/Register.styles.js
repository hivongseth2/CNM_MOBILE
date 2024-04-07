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
  title: {
    textAlign: 'center',
  },
  submitButton: {
    borderWidth: 0,
    marginTop: spacing.m,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: spacing.xl,
  },
  dateOfBirth: {
    padding: 5,
    fontSize: 15,
    color: '#686868',
  },
});
