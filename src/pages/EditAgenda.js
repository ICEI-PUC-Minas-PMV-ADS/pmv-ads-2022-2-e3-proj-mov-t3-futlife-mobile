import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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

import {getAgenda, updateAgenda, insertAgenda, deleteAgenda, findHorario} from '../services/agenda.services';
import {getQuadras} from '../services/quadra.services';
import {getHorarios} from '../services/horario.services';

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

  const [openHorario, setOpenHorario] = useState(false);
  const [valueHorario, setValueHorario] = useState(null);
  const [itemsHorario, setItemsHorario] = useState([]);

  const [openQuadra, setOpenQuadra] = useState(false);
  const [valueQuadra, setValueQuadra] = useState(null);
  const [itemsQuadra, setItemsQuadra] = useState([]);  

  //fetch('https://5ee6-2804-14c-5bc6-9f9d-599f-961-ca9-728.sa.ngrok.io/quadras')
  //.then(T => T.json())
  //.then(console.log)

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
    getQuadras().then(setItemsQuadra);    
    getHorarios().then(setItemsHorario);    
  }, [item]);

  const handleSalvar = async () => {
    if (item) {
      await findHorario({
        data,
        hora,
        idQuadra
      }).then(dados => {
        if (dados.length == 0) {
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
        }
        else {
          Alert.alert(
            "",
            "Horário indisponível",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
      });
    } else {
      await findHorario({
        data,
        hora,
        idQuadra
      }).then(dados => {
        if (dados.length == 0) {
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
        else {
          Alert.alert(
            "",
            "Horário indisponível",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
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
    backgroundColor: '#228B22',
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
