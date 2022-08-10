import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  info_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    color: colors.brightorange,
  },
  message_container: {
    paddingTop: 10,
  },
  message: {
    fontWeight: '500',
    fontSize: 17,
    color: 'black',
  },
});
