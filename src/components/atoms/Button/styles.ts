import type {ViewStyle} from 'react-native';
import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/constants';
import {ButtonTypes} from './types';

interface ComputedStyleProps {
  container?: ViewStyle;
}

export const getStyle = (props: ButtonTypes) => {
  const {variant} = props;
  const computedStyle: ComputedStyleProps = {};

  switch (variant) {
    case 'primary':
      computedStyle.container = {
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
      };
      return StyleSheet.create(computedStyle);
    case 'outline-primary':
      computedStyle.container = {
        borderColor: colors.primary,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
      };
      return StyleSheet.create(computedStyle);
    case 'secondary':
      computedStyle.container = {
        borderColor: colors.secondary,
        borderWidth: 20,
      };
      return StyleSheet.create(computedStyle);
    case 'outline-secondary':
      computedStyle.container = {
        borderColor: colors.secondary,
        borderWidth: 20,
      };
      return StyleSheet.create(computedStyle);
    default:
      computedStyle.container = {
        borderColor: colors.primary,
        borderWidth: 20,
      };
      return StyleSheet.create(computedStyle);
  }
};
