import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  // Style để căn giữa theo chiều dọc và chiều ngang
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',

    height: 80,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  // Style để căn giữa theo chiều ngang
  containerH: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',

    height: 80,
    flexDirection: 'row',
    margin: 7,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  containerText: {
    marginHorizontal: 10,
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  setting: {
    width: 30,
    height: 30,
  },
});
