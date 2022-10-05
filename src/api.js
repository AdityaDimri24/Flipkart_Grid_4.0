import {PermissionsAndroid} from 'react-native';

export const fetchData = base64 => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    requests: [
      {
        image: {
          content: base64,
        },
        features: [
          {
            type: 'PRODUCT_SEARCH',
            maxResults: 10,
          },
        ],
        imageContext: {
          productSearchParams: {
            productSet:
              'projects/odml-codelabs/locations/us-east1/productSets/product_set0',
            productCategories: ['apparel-v2'],
          },
        },
      },
    ],
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    'https://us-central1-odml-codelabs.cloudfunctions.net/productSearch/images:annotate?key=',
    requestOptions,
  )
    .then(response => response.json())
    .catch(error => console.log('error', error));
};

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
      console.log('Camera permission given');
    } else {
      console.log('Camera permission denied');
      return false
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};


export const getLinks = async() => {
try{
    const response = await fetch(
        'https://api-flipkart-2022.herokuapp.com/'
    );
    const result = await response.json();
    console.table(result);
    return result;
} catch (e){
    console.log("Error !")
    }
}
