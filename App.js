import React, { useState, useRef, useEffect } from 'react';
import * as Speech from 'expo-speech';
import styles, { cameraIconSize, closeIcon } from './styles';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { Ionicons } from '@expo/vector-icons';
import deviceLocale from './components/language'; 

// Set your token and IRIS server url here
const authToken = 'YOUR_AUTH_TOKEN';
const serverUrl = 'https://IRIS_SERVER_URL/upload';
////////////////////////////////////////////////////

const resizeHeight = 1500;
let abortController;

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const prepareFormData = (imageUri) => {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    formData.append('lang', deviceLocale.split('_')[0]);
    return formData;
  };

  const sendReadRequestAsync = (formData, onSuccess) => {
    abortController = new AbortController();
    fetch(serverUrl, {
      method: 'POST',
      signal: abortController.signal,
      headers: { Authorization: 'Bearer ' + authToken },
      body: formData,
    })
      .then((r) => r.json())
      .then((data) => onSuccess(data))
      .catch((e) => console.log('Request aborted or rejected'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.8, base64: false, skipProcessing: false };
      const data = await cameraRef.current.takePictureAsync(options);
      const imageUri = data.uri;
      if (!imageUri) throw Error('Camera error');
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { height: resizeHeight } }],
        { compress: 0.7, format: 'jpeg' }
      );

      const formData = prepareFormData(resizedPhoto.uri);
      sendReadRequestAsync(formData, (response) =>
        Speech.speak(response.text, {
          language: deviceLocale,
          onDone: cancelPreviewAndSpeech,
        })
      );

      await cameraRef.current.pausePreview();
      setIsPreview(true);
    }
  };

  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onPress={takePicture}
        style={styles.capture}>
        <Ionicons name="camera-sharp" size={cameraIconSize} color="black" />
      </TouchableOpacity>
    </View>
  );
  const cancelPreviewAndSpeech = async () => {
    Speech.stop();
    abortController.abort();
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };
  const renderCancelPreviewButton = () => (
    <TouchableOpacity
      onPress={cancelPreviewAndSpeech}
      style={styles.closeButton}>
      <Ionicons name="close-outline" size={closeIcon} color="#00000066" />
    </TouchableOpacity>
  );
  // Main view
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        flashMode={Camera.Constants.FlashMode.off}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log('cammera error', error);
        }}
      />
      <View style={styles.container}>
        {isPreview && renderCancelPreviewButton()}
        {!isPreview && renderCaptureControl()}
      </View>
    </SafeAreaView>
  );
}