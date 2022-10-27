import React from 'react';
import {StyleSheet, View} from 'react-native';

const Body = ({children}) =>{
  return <View style={styles.container}>{children}</View>
};

const styles = StyleSheet.create({
 container:{   
    alignItems: 'center',    
    backgroundColor: '#000000',
    margin:8,
  },
});

export default Body;