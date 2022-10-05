import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {height, width} from '../App';
const fs = RNFetchBlob.fs;

const FetchImage = ({navigation, route}) => {
  let imagePath = null;
  const [image, setimage] = useState(null);

  const fetch = () => {
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', route?.params?.link)
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(base64Data => {
        // here's base64 encoded image
        setimage(base64Data);
        // remove the file from storage
        return fs.unlink(imagePath);
      });
  };

  useEffect(() => {
    if (route?.params?.link && route?.params?.link.length > 1) fetch();
  }, []);

  if (!image)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <ActivityIndicator size={64} color="lightblue" />
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{uri: `data:image/jpg;base64,${image}`}}
        style={{
          height: height * 0.6,
          width: width * 0.8,
          resizeMode: 'cover',
          borderRadius: 16,
        }}
      />
      <TouchableOpacity
        style={{marginTop: 24}}
        onPress={() => navigation.navigate('Details', {response: image})}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '500',
            color: 'white',
          }}>
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FetchImage;
