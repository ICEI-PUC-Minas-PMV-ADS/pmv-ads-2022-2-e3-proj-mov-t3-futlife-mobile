import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const InputChar = (props) => {
  return (
      <TextInput 
        style={styles.input}         
        {...props}      
      />)
    ;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFF',
    marginBottom: 8,
  },
});

export default InputChar;