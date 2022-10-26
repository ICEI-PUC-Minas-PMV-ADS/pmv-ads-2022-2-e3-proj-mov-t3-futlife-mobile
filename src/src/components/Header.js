import React from 'react';
import { Appbar } from 'react-native-paper';

const Header = ({ title, goBack, children}) => {
  return (
    <Appbar.Header>
      {
        goBack && 
        <Appbar.BackAction onPress={goBack} />
      }
      <Appbar.Content title={title} />
      {children}
    </Appbar.Header>
  );
};

export default Header;
