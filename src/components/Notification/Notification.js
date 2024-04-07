import { styles } from '@/screens/Register/Register.styles';
import { shadow } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../Button';

const Notification = ({ message, actionText, onActionPress, actionText2, onActionPress2 }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.formContainer,
        shadow.light,
        {
          backgroundColor: colors.card,
          width: 300,
          height: 200,
          display: 'flex',
          position: 'absolute',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        },
      ]}
    >
      <Text>{message}</Text>
      {actionText && onActionPress && (
        <Button
          style={[styles.submitButton]}
          title={actionText}
          onPress={() => {
            onActionPress();
          }}
        />
      )}

      {onActionPress2 && (
        <Button
          style={[styles.submitButton]}
          title={actionText2}
          onPress={() => {
            onActionPress2();
          }}
        />
      )}
    </View>
  );
};

export default Notification;
