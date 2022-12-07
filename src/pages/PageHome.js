import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';

import ImageCarousel from '../ImageCarousel';
import Footer from '../components/Footer';

const statusBarHeight = StatusBar.currentHeight;

export default function PageHome({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <ImageCarousel />
        </View>

        <View style={styles.content}>
          <Text>Sobre Nós</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02013E',
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 25,
  },
  content: {
    alignSelf: 'center',
    flex: 1,
    borderRadius: 5,
    padding: 5,
    width: '97%',
    height: '100%',
    marginBottom: 10,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
