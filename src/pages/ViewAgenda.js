import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { List, Text, FAB, Button } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import Logo from '../components/Logo';

import {useNavigation} from '@react-navigation/native';
import {useUser} from '../contexts/UserContext';
import {getAgenda} from '../services/agenda.services';

import { useIsFocused } from '@react-navigation/native';

const ViewAgenda = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {name} = useUser();
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    getAgenda().then(dados => {
      console.log(dados);
      setAgenda(dados);
    });
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <List.Item style={styles.listaAgenda}
      title={'Equipe: ' + item.equipe + ' - ' + item.idQuadra}
      description={                
        'Horário:       ' + item.hora + ''
      }  

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
          {item.data}
          {' '}
        </Text>
      )}
      onPress={() => navigation.navigate('EditAgenda', {item})}
    />
  );

  return (
    <Container style={styles.telaAgenda}> 
      <Header title={'Bem Vindo, ' + name} />      
      <Body>
        <FlatList
          data={agenda}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Button
          style={styles.fab}
          small          
          icon="plus"
          onPress={() => navigation.navigate('EditAgenda')}
        />
      </Body>
      <View style={styles.header}>
        <Logo />        
      </View>      
    </Container>
  );
};

const styles = StyleSheet.create({

  listaAgenda: {
    backgroundColor: '#10101010',         
  },

  telaAgenda: {
    backgroundColor: '#FFF',      
  },
  fab: {
    marginLeft: 40, 
    margin: 16,
    right: 0,
    bottom: 0,    
    backgroundColor: '#228B22',
    width: '80%',    
  },
});

export default ViewAgenda;