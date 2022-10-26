import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  RadioButton,
  Text,
  TextInput,
  Button,
  Appbar,
} from 'react-native-paper';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';

import { useNavigation } from '@react-navigation/native';

import {updateAgenda, insertAgenda, deleteAgenda} from '../services/agenda.services';

const Agendamento = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params ? route.params : {};

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [hora, setHora] = useState(null);  
  const [data, setData] = useState(moment(new Date()).format('DD/MM/YYYY'));
  const [idQuadra, setIdQuadra] = useState(null);  

  useEffect(() =>{
    if(item){
      setData(item.data);
      setHora(item.hora);
      setIdQuadra(item.idQuadra);            
    }
  }, [item]);

  const handleSalvar = () => {
    if(item){
      updateAgenda({
        data: data,
        hora: hora,
        idQuadra: idQuadra,        
        id: item.id
      }).then(res => {
        navigation.goBack();
      });
    }else{
      insertAgenda({       
        data: data,
        hora: hora,
        idQuadra: idQuadra        
      }).then(res => {
        navigation.goBack();
      });

    }
  };

  const handleExcluir = () => {
    deleteAgenda(item.id).then(res => {
      navigation.goBack();
    } );
  };

  return (
    <Container>
      <Header title={'Agendamento'} goBack={() => navigation.goBack()}>
        <Appbar.Action icon="check" onPress={handleSalvar} />
        {
          item && 
          <Appbar.Action icon="trash-can" onPress={handleExcluir} />
        }
        
      </Header>

      <Body>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShow(false)}
            onChange={(event, date) => {
              setShow(false);
              setData(moment(date).format('DD/MM/YYYY'));
            }}
          />
        )}

        <TouchableOpacity onPress={() => setShow(true)}>
          <Input
            label="Data"
            value={data}
            left={<TextInput.Icon name="calendar" />}
            editable={false}
          />
        </TouchableOpacity>

        <Input
          label="Hora"
          value={hora}
          onChangeText={(text) => setHora(text)}
          left={<TextInput.Icon name="currency-brl" />}
        />

        <Input
          label="Quadra"
          value={idQuadra}
          onChangeText={(text) => setIdQuadra(text)}
          left={<TextInput.Icon name="currency-brl" />}
        />        
        
        <Button mode="contained" style={styles.button} onPress={handleSalvar}>
          Salvar
        </Button>

        {item && (
          <Button
            mode="contained"
            color={'red'}
            style={styles.button}
            onPress={handleExcluir}>
            Excluir
          </Button>
        )}
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 8,
  },
});

export default Agendamento;
