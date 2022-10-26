import React from 'react';
import {StyleSheet, View} from 'react-native';

const Body = ({children}) =>{
  return <View style={styles.container}>{children}</View>
};

const styles = StyleSheet.create({
 container:{
    flex:1,
    backgroundColor: '#FFF',
    margin:8
  },
});

export default Body;