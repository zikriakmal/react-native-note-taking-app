import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../utils/constants';

const styles = StyleSheet.create({
  logoTextTitle: {marginTop: 10, fontSize: 18, fontWeight: '600'},
  logoTextSubtitle: {marginVertical: 5, fontSize: 14, fontWeight: '300'},
  logoImage: {marginLeft: 25, height: 100, width: 112},
  backgroundContainer: {position: 'absolute', top: 0},
  backgroundInner1: {
    backgroundColor: colors.primary,
    height: Dimensions.get('window').height / 2.5,
    width: '100%',
  },
  backgroundInner2: {
    width: '100%',
    borderTopWidth: 150,
    borderTopColor: colors.primary,
    borderLeftWidth: 500,
    borderLeftColor: 'transparent',
    borderStyle: 'solid',
  },
  bottomSheetContainer: {
    minHeight: 280,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  bodyContainer: {
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  imageContainer: {
    marginVertical: 20,
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  textTitle: {fontSize: 14, fontWeight: '600', color: '#000'},
  textInputLabel: {
    marginVertical: 5,
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
  },
  textInputError: {marginTop: 2, color: 'red', fontSize: 10},
  textInputContainer: {marginVertical: 10, width: 180},
  textInputInnerContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  btnMainContainer: {
    marginTop: 30,
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 10,
  },
  btnMainTextContainer: {color: 'white', paddingHorizontal: 10},
  btnContainer: {
    borderColor: colors.secondary,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  btnText: {
    color: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default styles;
