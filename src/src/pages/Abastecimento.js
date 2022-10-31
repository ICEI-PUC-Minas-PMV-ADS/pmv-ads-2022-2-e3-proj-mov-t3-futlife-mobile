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

import {updateGasto, insertGasto, deleteGasto} from '../services/gastos.services';

const Abastecimento = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params ? route.params : {};

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [tipo, setTipo] = useState('gas');
  const [preco, setPreco] = useState(null);
  const [valor, setValor] = useState(null);
  const [odometro, setOdometro] = useState(null);
  const [data, setData] = useState(moment(new Date()).format('DD/MM/YYYY'));

  useEffect(() =>{
    if(item){
      setTipo(item.tipo == 0? 'gas': 'eta');
      setData(item.data);
      setPreco(item.preco);
      setValor(item.valor);
      setOdometro(item.odometro);
    }
  }, [item]);

  const handleSalvar = () => {
    if(item){
      updateGasto({
        tipo: tipo == 'gas' ? 0 : 1,
        data: data,
        preco: preco,
        valor: valor,
        odometro: odometro,
        id: item.id
      }).then(res => {
        navigation.goBack();
      });
    }else{
      insertGasto({
       tipo: tipo == 'gas' ? 0 : 1,
        data: data,
        preco: preco,
        valor: valor,
        odometro: odometro,
      }).then(res => {
        navigation.goBack();
      });

    }
  };

  const handleExcluir = () => {
    deleteGasto(item.id).then(res => {
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
        <View style={styles.containerRadio}>
         <Text> Escolha sua Data </Text>
        </View>

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
            editable={true}
          />
        </TouchableOpacity>

        <Input
          label="Numero de Jogadores"
          value={preco}
          onChangeText={(text) => setPreco(text)}
          left={<TextInput.Icon name="account-group" />}
        />
         <Input
          label="Equipe"
          value={odometro}
          onChangeText={(text) => setOdometro(text)}
          left={<TextInput.Icon name="account-circle-outline" />}
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
  containerRadio: {    
    margin: 8,
    alignItems: 'center',    
  },  
  button: {
    marginBottom: 8,
  },
});

export default Abastecimento;
