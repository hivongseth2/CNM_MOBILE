import { StyleSheet } from 'react-native';

/*
 * generated with https://ethercreative.github.io/react-native-shadow-generator/
 * to get the same shadow on both platforms
 */
export const shadow = StyleSheet.create({
  primary: {
    elevation: 5,
    shadowColor: '#000000',
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  heavy: {
    elevation: 10,
    shadowColor: '#000000',
    shadowRadius: 6,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  // Shadow style for a lighter shadow
  light: {
    elevation: 3,
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  // Shadow style for a different color shadow
  customColor: {
    elevation: 5,
    shadowColor: '#FF0000', // Red shadow color
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
