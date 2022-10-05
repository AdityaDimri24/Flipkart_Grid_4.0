import * as React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/DetailScreen';

import {Dimensions} from 'react-native';
import FetchImage from './src/FetchImage';

export const {width, height} = Dimensions.get('screen');

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Fetch" component={FetchImage} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
    </>
  );
}

export default App;
