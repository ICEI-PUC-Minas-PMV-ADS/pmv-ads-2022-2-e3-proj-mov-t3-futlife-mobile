import React, {useState} from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import MinhaAgenda from './MinhaAgenda';

const Home = () => {
  const [index, setIndex] = useState(0);
  
  const [routes] = useState([
    { key: 'agenda', title: 'Minha Agenda', icon: 'gas-station' },              
  ]);

  const renderScene = BottomNavigation.SceneMap({
    agenda: MinhaAgenda,       
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