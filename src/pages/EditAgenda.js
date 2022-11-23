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
import InputChar from '../components/InputChar';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useUser} from '../contexts/UserContext';

import {updateAgenda, insertAgenda, deleteAgenda} from '../services/agenda.services';

const EditAgenda = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params ? route.params : {};

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);   
  const [data, setData] = useState(moment(new Date()).format('DD/MM/YYYY'));      
  const [idQuadra, setIdQuadra] = useState(null);
  const [hora, setHora] = useState(null);      
  const [numJogadores, setNumJogadores] = useState(null);
  const [equipe, setEquipe] = useState(null);
  const {name} = useUser();
  const [nomeCompleto, setNomeCompleto] = useState(name);

  const [openQuadra, setOpenQuadra] = useState(false);
  const [valueQuadra, setValueQuadra] = useState(null);
  const [itemsQuadra, setItemsQuadra] = useState([
    { label: 'Voleibol', value: 'voleibol' },
    { label: 'Society', value: 'society' },
    { label: 'Basquete', value: 'basquete' },
    { label: 'Tênis', value: 'tenis' },
    { label: 'Peteca', value: 'peteca' }
  ]);

  const [openHorario, setOpenHorario] = useState(false);
  const [valueHorario, setValueHorario] = useState(null);
  const [itemsHorario, setItemsHorario] = useState([
    { label: '06:00-07:50', value: '06:00-07:50' },
    { label: '08:00-09:50', value: '08:00-09:50' },
    { label: '10:00-11:50', value: '10:00-11:50' },
    { label: '12:00-13:50', value: '12:00-13:50' },
    { label: '14:00-15:50', value: '14:00-15:50' },
    { label: '16:00-17:50', value: '16:00-17:50' },
    { label: '18:00-19:50', value: '18:00-19:50' },
    { label: '20:00-21:50', value: '20:00-21:50' }
  ]);

  useEffect(() => {
    if (item) {
      setData(item.data);      
      setHora(item.hora);    
      setIdQuadra(item.idQuadra);
      setNumJogadores(item.numJogadores);
      setEquipe(item.equipe);
      setNomeCompleto(item.nomeCompleto);
      setValueQuadra(item.idQuadra);
      setValueHorario(item.hora);
    }
  }, [item]);

  const handleSalvar = () => {
    if (item) {
      updateAgenda({
        data: data,
        hora: hora,
        idQuadra: idQuadra,
        numJogadores: numJogadores,
        equipe: equipe,
        nomeCompleto: nomeCompleto,
        id: item.id
      }).then(res => {
        navigation.goBack();
      });
    } else {
      insertAgenda({
        data: data,
        hora: hora,
        idQuadra: idQuadra,
        numJogadores: numJogadores,
        equipe: equipe,
        nomeCompleto: nomeCompleto
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
  
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

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
          <Text> Agendar Horário </Text>
        </View> 

        <InputChar
          label="Nome Completo"
          value={nomeCompleto}
          onChangeText={(text) => setNomeCompleto(text)}
          left={<TextInput.Icon name="account-circle-outline" />}
        />    
        
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShow(false)}
            onChange={(event, date) => {
              setShow(false);              
              setData(moment(date).format('DD/MM/YYYY'));                                          
            }}
          />
        )}     

        <TouchableOpacity onPress={() => showMode('date')}>
          <Input
            label="Data"
            value={data}
            left={<TextInput.Icon name="calendar" />}
            editable={false}
          />
        </TouchableOpacity>  

        <Text style={styles.label}>Horário</Text>

        <View style={styles.dropdownHorario}>
          <DropDownPicker style={styles.dropdown}
            open={openHorario}
            value={valueHorario}
            items={itemsHorario}
            setOpen={setOpenHorario}
            setValue={setValueHorario}
            setItems={setItemsHorario}
            onChangeValue={(value) => setHora(value)}
            placeholder="Horário disponível"
            placeholderStyle={styles.placeholderStyles}                       
          />
        </View>                      

        <Input
          label="Numero de Jogadores"
          value={numJogadores}
          onChangeText={(text) => setNumJogadores(text)}
          left={<TextInput.Icon name="account-group" />}
        />
        <InputChar
          label="Equipe"
          value={equipe}
          onChangeText={(text) => setEquipe(text)}
          left={<TextInput.Icon name="account-circle-outline" />}
        />

        <Text style={styles.label}>Quadra</Text>

        <View style={styles.dropdownQuadra}>
          <DropDownPicker style={styles.dropdown}
            open={openQuadra}
            value={valueQuadra}
            items={itemsQuadra}
            setOpen={setOpenQuadra}
            setValue={setValueQuadra}
            setItems={setItemsQuadra}
            onChangeValue={(value) => setIdQuadra(value)}
            placeholder="Quadra"
            placeholderStyle={styles.placeholderStyles}
                       
          />
        </View>                            

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
  dropdown: {
    backgroundColor: '#FFF',
    width: '68%',
    marginBottom: 10,
    borderRadius: 5,
    marginLeft: 50
  },
  label: {
    marginLeft: 50,
    marginBottom: 5,
  },
  dropdownQuadra: {
    marginHorizontal: 10,
    width: "50%",
    marginBottom: 15,
    borderRadius :5, 
  },
  dropdownHorario: {
    marginHorizontal: 10,
    width: "50%",
    marginBottom: 15,
    borderRadius :5, 
  },  
  dropdown: {
    borderColor: "#B7B7B7",
    width: "135%",
    
    marginLeft: 40,
  },

  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    backgroundColor: 'white'
  },
 
  text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center'
  },
 
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },  
});

placeholderStyles: {
  backgroundColor: 'grey'

}

export default EditAgenda;
