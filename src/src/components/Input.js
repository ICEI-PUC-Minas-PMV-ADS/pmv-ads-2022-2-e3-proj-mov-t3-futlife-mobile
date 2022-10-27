import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const Header = (props) => {
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
    width: '80%',          
    marginBottom: 50,    
    fontSize: 20,
    borderRadius :10,          
  },
});

export default Header;
