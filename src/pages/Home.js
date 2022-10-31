import React, {useState} from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import Gastos from './Gastos';

const Home = () => {
  const [index, setIndex] = useState(0);
  
  const [routes] = useState([
    { key: 'gastos', title: 'Agendamento', icon: 'calendar-account' },    
  ]);

  const renderScene = BottomNavigation.SceneMap({
    gastos: Gastos,
    calculadora: Calculadora,
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