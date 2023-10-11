import {StyleSheet} from 'react-native';
import {colors} from '../../utils/constants';

const styles = StyleSheet.create({
  backgroundContainer: {position: 'absolute', top: 0},
  backgroundInner1: {
    backgroundColor: colors.primary,
    height: 65,
    width: '100%',
  },
  backgroundInner2: {
    width: '100%',
    borderTopWidth: 100,
    borderTopColor: colors.primary,
    borderRightWidth: 500,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default styles;
