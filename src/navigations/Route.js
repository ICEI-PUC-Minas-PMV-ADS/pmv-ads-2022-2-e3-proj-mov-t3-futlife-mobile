import React from 'react';

import {useUser} from '../contexts/UserContext';

import NavigationUserSigned from './NavigationUserSigned';
import Auth from './Auth';
import NavigationUserUnsigned from './NavigationUserUnsigned';


const Route = () => {

  const {signed} = useUser();

  return (
    <>
    {
      signed 
      ? <NavigationUserSigned />
      : <NavigationUserUnsigned />
    }
    </>
  )
}

export default Route;