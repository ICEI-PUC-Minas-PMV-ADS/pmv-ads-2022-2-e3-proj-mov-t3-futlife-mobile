import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { List, Text, FAB } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import Logo from '../components/Logo';


import {useNavigation} from '@react-navigation/native';
import {useUser} from '../contexts/UserContext';
import {getGastos} from '../services/gastos.services';

import { useIsFocused } from '@react-navigation/native';

const Gastos = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {name} = useUser();
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    getGastos().then(dados => {
      console.log(dados);
      setGastos(dados);
    });
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <List.Item
      title={
        'Qt. Jogadores:  ' + item.preco + ''
      }
      description={'Equipe: ' + item.odometro}
      left={(props) => (
        <List.Icon
          {...props}
          color={item.tipo == 2 ? 'red' : 'green'}
          icon="soccer"
        />
      )}
      right={(props) => (
        <Text {...props} style={{ alignSelf: 'center' }}>
          {' '}
          {item.data}{' '}
        </Text>
      )}
      onPress={() => navigation.navigate('Abastecimento', {item})}
    />
  );

  return (
    <Container style={styles.telaGastos}>    
      <Header title={'Bem Vindo, ' + name} />
      <Body >
       
        <FlatList
          data={gastos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <FAB
          style={styles.fab}
          esmall
          icon="plus"
          onPress={() => navigation.navigate('Abastecimento')}
        />
      </Body>
      <View style={styles.header}>
        <Logo />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
 telaGastos: {
    backgroundColor: '#FFF',      
  },

  fab: {     
    margin: 16,
    right: 0,
    bottom: 0,    
    backgroundColor: '#228B22',
  },
});

export default Gastos;
