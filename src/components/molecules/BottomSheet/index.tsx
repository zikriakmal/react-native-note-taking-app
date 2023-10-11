import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Modal, PanResponder, TouchableWithoutFeedback, View } from 'react-native';
import styles from './styles';

const BottomSheet = (props: any) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 200,
    useNativeDriver: true,
  });

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const handleDismiss = () => closeAnim.start(props.onDismiss);

  useEffect(() => {
    resetPositionAnim.start();
  }, [resetPositionAnim]);

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 0) {
          return handleDismiss();
        }
        return resetPositionAnim.start();
      },
    }),
  ).current;

  return (
    <Modal
      animated
      animationType="fade"
      visible={props.visible}
      transparent
      onRequestClose={handleDismiss}>
      <TouchableWithoutFeedback
        onPress={() => {
          handleDismiss();
        }}>

        <View style={styles.overlay}>
          <Animated.View
            style={{
              ...styles.container,
              transform: [{ translateY: translateY }],
            }}
            {...panResponders.panHandlers}>
            <View style={styles.sliderIndicatorRow}>
              <View style={styles.sliderIndicator} />
            </View>
            {/* <KeyboardAwareScrollView enableOnAndroid={true} style={{ height: "100%" }} enableAutoAutomaticScroll={(Platform.OS === 'ios')} > */}
            {props.children}
            {/* </KeyboardAwareScrollView> */}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomSheet;
