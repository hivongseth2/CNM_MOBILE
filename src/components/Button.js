import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { typography } from '@/theme';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    width: '100%',
  },
  buttonSmall: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    padding: 3,
    width: '40%',
  },
});

export function Button({ style, textStyle, title, small, ...rest }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[!small ? styles.button : styles.buttonSmall, { borderColor: colors.border,...style }]}
      {...rest}
    >
      <Text style={[{ color: colors.text }, typography.label, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
};

Button.defaultProps = {
  style: null,
  textStyle: null,
};
