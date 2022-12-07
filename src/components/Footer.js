import React from 'react';
import { StyleSheet, View ,ScrollView, Text, Image} from 'react-native';

const Footer = () => {
  return (
  <View style={styles.footer}>
  <View style={styles.logoContainer}>
  <Image style={styles.logo} source={require('../assets/Fut.png')}/>
   </View>
  <ScrollView><Text style={styles.contato}>Entre em contato:</Text>
  <View><Text style={styles.tel}>Tel:  (31) 99999-9999</Text></View>
  <View><Text style={styles.email}>Email:  contato@futlife.com</Text></View>
  </ScrollView>
</View>)
};

const styles = StyleSheet.create({
   footer: {
     paddingTop: 10,
     marginTop: 15,
    backgroundColor: '#0A3E01',
  },
  contato: {
    margin: 0,
    marginLeft: 10,
    fontSize: 18,
    flex: 1,
    color: 'white',
  },
  tel:{
    marginTop: 5,
    marginLeft: 15,
    flex: 1,
    color: 'white',

  },
   email: {
     marginTop: 5,
     marginLeft: 15,
     marginBottom: 10,
     fontSize: 15,
    flex: 1,
    color: 'white',
  },
  logo: {
    position:'absolute',
    resizeMode: 'center',
     width: '35%',
    height: 35,

  },
  logoContainer: {
    position: 'relative',
    alignItems: 'flex-end',
    paddingTop: 5,
  },
});

export default Footer;