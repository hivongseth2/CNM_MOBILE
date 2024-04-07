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
    width: '10%',
    height: 30,
  },
});

export function ButtonIcon({ style, textStyle, icon, small, ...rest }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[!small ? styles.button : styles.buttonSmall, { borderColor: colors.border,...style }]}
      {...rest}
    >
      {icon}
    </TouchableOpacity>
  );
}

ButtonIcon.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  icon: PropTypes.element.isRequired, // Đổi PropTypes thành element
};

ButtonIcon.defaultProps = {
  style: null,
  textStyle: null,
};

export default ButtonIcon;
