import React, {useState} from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import ViewAgenda from './ViewAgenda';

const Home = () => {
  const [index, setIndex] = useState(0);
  
  const [routes] = useState([
    { key: 'agenda', title: 'Agendamento', icon: 'calendar-account' }    
  ]);

  const renderScene = BottomNavigation.SceneMap({
    agenda: ViewAgenda       
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