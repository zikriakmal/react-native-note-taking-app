import { View } from 'react-native';

const Gap = ({ h = 0, w = 0 }) => {
    return (
        <View style={{ height: h, width: w }} />
    );
};

export default Gap;
