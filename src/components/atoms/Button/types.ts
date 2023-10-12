import {TouchableOpacityProps} from 'react-native-gesture-handler';

export interface ButtonTypes extends TouchableOpacityProps {
  variant?: 'primary' | 'outline-primary' | 'secondary' | 'outline-secondary';
}
