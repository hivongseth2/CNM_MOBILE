import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { typography } from '@/theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export function ErrorView({ errors }) {
  console.log(errors[0]);
  const { colors } = useTheme();

  if (errors.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {errors.map((error) => (
        <Text key={error} style={[typography.error, { color: colors.error }]}>
          {error}
        </Text>
      ))}
    </View>
  );
}

ErrorView.propTypes = {
  errors: PropTypes.array.isRequired,
};
