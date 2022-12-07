import React, { useRef, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground,RCTAnimation } from 'react-native';
import Carousel from 'react-native-anchor-carousel';

import { SimplePaginationDot } from './components/Index';

const { width: windowWidth } = Dimensions.get('window');

const data = [
  {
    image: require('./assets/quadra1.jpg'),
    title: 'Campo Society',
    content: 'Campo aberto com capacidade máxima de 14 jogadores',
  },
  {
    image: require('./assets/quadra2.jpeg'),
    title: 'Campo Society',
    content: 'Campo aberto com capacidade máxima de 14 jogadores',
  },
  {
    image: require('./assets/quadra3.jpg'),
    title: 'Quadra de Esportes',
    content: 'Quadra coberta com capacidade máxima de 12 jogadores',
  },
];

const INITIAL_INDEX = 0;
export default function ImageCarousel(props) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }

  function renderItem({ item, index }) {
    const { image, title, content } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <ImageBackground source={image} style={styles.imageBackground}>
          <View style={styles.rightTextContainer}>
            <Text style={styles.rightText}>FUTLIFE</Text>
          </View>
        </ImageBackground>
        <View style={styles.lowerContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={renderItem}
        itemWidth={0.9 * windowWidth}
        inActiveOpacity={0.7}
        containerWidth={windowWidth}
        onScrollEnd={handleCarouselScrollEnd}
        ref={carouselRef}
      />
      <SimplePaginationDot currentIndex={currentIndex} length={data.length} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '',
    paddingVertical: 10,
  },
  carousel: {
    backgroundColor: '',
    aspectRatio: 1.2,
    flexGrow: 0,
    marginLeft: 1,
    marginBottom: 20,
  },
  item: {
    borderWidth: 2,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 3,
  },
  imageBackground: {
    flex: 2,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: 'white',
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: 0,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightText: {
    color: 'white',
  },
  lowerContainer: {
    flex: 1,
    margin: 20,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  contentText: {
    marginTop: 5,
    fontSize: 14,
  },
});