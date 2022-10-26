import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { List, Text, FAB } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

import {useNavigation} from '@react-navigation/native';
import {useUser} from '../contexts/UserContext';
import {getAgenda} from '../services/agenda.services';

import { useIsFocused } from '@react-navigation/native';

const MeusAgendamentos = () => {

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
    <List.Item
      title={
        item.idQuadra
      }
      right={(props) => (
        <Text {...props} style={{ alignSelf: 'center' }}>
          {' '}
          {item.data}
          {' '}
          {item.hora}
          {' '}
        </Text>
      )}
      onPress={() => navigation.navigate('Agendamento', {item})}
    />
  );

  return (
    <Container>
      <Header title={'Olá, ' + name} />
      <Body>
        <FlatList
          data={agenda}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => navigation.navigate('Agendamento')}
        />
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default MeusAgendamentos;
