import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import Swiper from '../components/Swiper';

const Example = () => {
  const [page, setPage] = useState(0);
  
  return (
    <View
      style={[styles.container, {
        backgroundColor: 'black'
      }]}
    >
      <Swiper 
        backgroundColor={'black'} 
        onPageChange={setPage} 
        page={page}
        dotColor={'green'}
        activeDotColor={'blue'}
        dotsBackgroundColor={'white'}
        dotsElevation={2}
      >
        <View style={{ top: 20 }}>
          <Text style={styles.text}>Hello World!</Text>
        </View>
        <View style={{ top: 20 }}>
          <Text style={styles.text}>Hello You!</Text>
        </View>
        <View style={{ top: 20 }}>
          <Text style={styles.text}>Hello Moon!</Text>
        </View>
        <View style={{ top: 20 }}>
          <Text style={styles.text}>Hello Stars!</Text>
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  text: {
    color: 'red'
  }
});

export default Example;