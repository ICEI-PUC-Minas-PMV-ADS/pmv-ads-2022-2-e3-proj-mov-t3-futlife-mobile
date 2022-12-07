import React, {useState} from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import ViewAgenda from '../pages/ViewAgenda';
import EditAgenda from '../pages/EditAgenda';
import CapturePhoto from '../pages/CapturePhoto';
import PageHome from '../pages/PageHome';

const NavigationHome = () => {
  const [index, setIndex] = useState(1);
  
  const [routes] = useState([
    //{ key: 'photo', title: 'Foto do usuário', icon: 'calendar-account' },
    { key: 'Home', title: 'Home', icon: 'calendar-account' },
    { key: 'agenda', title: 'Agenda', icon: 'calendar-account' }    
  ]);

  const renderScene = BottomNavigation.SceneMap({
    agenda: ViewAgenda,
    Home: PageHome,    
    photo: CapturePhoto,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default NavigationHome;