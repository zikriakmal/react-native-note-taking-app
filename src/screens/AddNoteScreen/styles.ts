import {StyleSheet} from 'react-native';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
  textInputLabel: {
    marginVertical: 5,
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
  },
  textInputError: {marginTop: 2, color: 'red', fontSize: 10},
  textInputContainer: {marginVertical: 10},
  textInputInnerContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  textAreaInputInnerContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  btnMainContainer: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnMainTextContainer: {
    color: 'white',
    paddingHorizontal: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  backgroundContainer: {position: 'absolute', bottom: 0},
  backgroundInner1: {
    backgroundColor: colors.primary,
    height: 100,
    width: '100%',
  },
  backgroundInner2: {
    width: '100%',
    borderBottomWidth: 100,
    borderBottomColor: colors.primary,
    borderLeftWidth: 500,
    borderLeftColor: 'transparent',
  },
});

export default styles;
