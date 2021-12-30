import React, { useEffect } from 'react';

import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  runOnUI
} from 'react-native-reanimated';

import {
  GestureDetector,
  Gesture
} from 'react-native-gesture-handler';

import PageDots from './PageDots';

const Swiper = props => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }]
  }));

  const pages = useSharedValue(props.children.length);
  const swipeVelocity = useSharedValue(200);
  const pageChangeDuration = useSharedValue(200);

  const start = useSharedValue(0);
  const gestureLastVelocity = useSharedValue(0);
  const gestureLastOffset = useSharedValue(0);
  const viewPortWidth = useSharedValue(Dimensions.get('window').width);

  const winWidth = Dimensions.get('window').width;
  viewPortWidth.value = winWidth;

  useEffect(() => runOnUI(setPage(props.page)), [props.page]);

  const setPage = page => {
    'worklet';
    offset.value = withTiming(-page * viewPortWidth.value, {
      duration: pageChangeDuration.value
    });
  };

  const setNewPage = newPage => {
    props.onPageChange(parseInt(newPage));
  };
  
  const gesture = Gesture.Pan()
    .onBegin(() => {
      gestureLastVelocity.value = 0;
      gestureLastOffset.value = offset.value;
    })
    .onUpdate(e => {
      const newOffset = e.translationX + start.value;
      if (newOffset < 0 && -newOffset < viewPortWidth.value * (pages.value - 1)) {
        offset.value = newOffset;
        gestureLastVelocity.value = e.velocityX < 0 ? -e.velocityX : e.velocityX;
      }
    })
    .onEnd(() => {
      let newPage = -offset.value / viewPortWidth.value;
      
      if (gestureLastVelocity.value > swipeVelocity.value) {
        for (let i = 1; i < pages.value; i++) {
          if (newPage < i) {
            newPage = i - (gestureLastOffset.value < offset.value ? 1 : 0);
            break;
          }
        }
        
        start.value = -newPage * viewPortWidth.value;
      } else {
        const diff = offset.value - gestureLastOffset.value;
        const absDiff = (diff < 0 ? -diff : diff);
        
        if (absDiff > viewPortWidth.value / 2) {
          const diffMul = (diff < 0 ? -1 : 1);
          start.value = offset.value + diffMul * (viewPortWidth.value - absDiff);
        }
        
        newPage = -start.value / viewPortWidth.value;
      }

      offset.value = withTiming(start.value, {
        duration: pageChangeDuration.value
      });

      runOnJS(setNewPage)(newPage);
    });

  const children = props.children.map((child, i) => {
    return React.cloneElement(child, {
      key: i,
      style: [{ 
        position: 'absolute',
        left: winWidth * i,
        top: 0,
        bottom: 0,
        width: winWidth,
        backgroundColor: props.backgroundColor
      }, child.props.style]
    });
  });
  
  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[{
              width: pages.value * viewPortWidth.value,
              backgroundColor: props.backgroundColor
            }, 
            animatedStyles,
            styles.container
          ]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
      <PageDots 
        pages={children.length} 
        activePage={props.page} 
        dotColor={props.dotColor} 
        activeDotColor={props.activeDotColor} 
        backgroundColor={props.dotsBackgroundColor}
        elevation={props.dotsElevation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  }
});

export default Swiper;