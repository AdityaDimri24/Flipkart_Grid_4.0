import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import {requestCameraPermission} from './api';

/* toggle includeExtra */
const includeExtra = true;

export default function App() {
  const [response, setResponse] = React.useState('');

  React.useEffect(() => {}, []);

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      // ImagePicker.launchCamera(options, setResponse);
      requestCameraPermission();
      ImagePicker.launchCamera(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          console.log(response);
        }
      });
    } else {
      // ImagePicker.launchImageLibrary(options, setResponse);
      ImagePicker.launchImageLibrary(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          console.log(response);
        }
      });
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 36,
          textAlign: 'center',
          marginTop: 16,
          fontWeight: '600',
          color: 'white',
        }}>
        Fashion Scrapper
      </Text>

      
      <TouchableOpacity
        style={{position: 'absolute', bottom: 24, alignSelf: 'center'}}
        onPress={() => onButtonPress(actions[0].type, actions[0].options)}>
        <Image
          source={require('./assets/camera.png')}
          style={{
            width: 72,
            height: 72,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{position: 'absolute', bottom: 24, alignSelf: 'center'}}
        onPress={() => onButtonPress(actions[0].type, actions[0].options)}>
        <Image
          source={require('./assets/camera.png')}
          style={{
            width: 72,
            height: 72,
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const actions = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: `Select Image or Video\n(mixed)`,
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },

  image: {
    marginVertical: 24,
    alignItems: 'center',
  },
});
