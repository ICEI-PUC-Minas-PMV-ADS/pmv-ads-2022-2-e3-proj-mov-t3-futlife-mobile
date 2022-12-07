import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';

export default function CapturePhoto() {
  const camRef = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);  //Camera.useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    console.log("camera possui acesso");
    return <View />;
  }
  if (hasPermission === false) {
    console.log("camera não possui acesso");
    return <Text>No access to camera</Text>;
  }

  function toggleCameraType() {
    console.log('estou no toggleCameraType');
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if (camRef) {
      console.log('estou no takePicture');
      console.log(camRef);
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
      console.log(data);
      console.log(capturedPhoto);
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonFlip} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <TouchableOpacity style={styles.buttonClick} onPress={takePicture}>
        <FontAwesome name="camera" size={23} color="#FFF" />
      </TouchableOpacity>

      {
        capturedPhoto &&
        <Modal animationType="slide" transparent={false} visible={open} >

          <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
            <FontAwesome name="window-close" size={50} color="#FF0000"></FontAwesome>
          </TouchableOpacity>

          <Image style={styles.Image}

            source={{ uri: capturedPhoto }}
          />

          <Text> {capturedPhoto} </Text>
          


        </Modal>

      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  buttonFlip: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonClick: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    height: 50,
  },
  viewclose: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  Image: {
    width: '100%',
    height: '70%',
    borderRadius: 20,
  },

});
