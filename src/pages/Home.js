import React, {useState} from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import ViewAgenda from './ViewAgenda';
import EditAgenda from './EditAgenda';
import CapturePhoto from './CapturePhoto';

const Home = () => {
  const [index, setIndex] = useState(0);
  
  const [routes] = useState([
    { key: 'agenda', title: 'Agendamento', icon: 'calendar-account' },    
    { key: 'photo', title: 'Foto do usuário', icon: 'calendar-account' }        
  ]);

  const renderScene = BottomNavigation.SceneMap({
    agenda: ViewAgenda,
    photo: CapturePhoto
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Home;