import React from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

const PageDots = props => {
  const activeDot = (
    <View
      style={[
        {
          backgroundColor: props.activeDotColor,
          width: 8,
          height: 8,
          borderRadius: 4,
          marginLeft: 3,
          marginRight: 3
        }
      ]}
    />
  );

  const dot = (
    <View
      style={[
        {
          backgroundColor: props.dotColor,
          width: 8,
          height: 8,
          borderRadius: 4,
          marginLeft: 3,
          marginRight: 3
        }
      ]}
    />
  );

  const dots = [];

  for (let i = 0; i < props.pages; i++) {
    dots.push(
      i === props.activePage
        ? React.cloneElement(activeDot, { key: i })
        : React.cloneElement(dot, { key: i })
    );
  }

  return (
    <View style={[
      styles.dots, {
        backgroundColor: props.backgroundColor,
        shadowOffset: { width: 0, height: 0.5 * props.elevation * 5 },
        shadowRadius: 0.8 * props.elevation * 5,
        elevation: props.elevation * 5
      }]} >
      {dots}
    </View>
  );
};

const styles = StyleSheet.create({
  dots: {
    position: 'absolute',
    bottom: -100,
    left: 0,
    right: 0,
    height: 128,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 10,
    paddingTop: 10,
    shadowColor: 'black',
    shadowOpacity: 0.15
  }
});

export default PageDots;