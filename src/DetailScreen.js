import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchData } from "./api";
import { height, width } from "../App";

const getImages = async (item) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const style = item?.product?.productLabels[0].value;
  const category = item?.product?.productLabels[1].value?.replace(" ", "+");
  const score = item?.score;

  const data = await fetch(
    `https://us-central1-odml-codelabs.cloudfunctions.net/productSearch/${item?.image}?key=`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return {
    link: `https://www.flipkart.com/search?q=${style}+${category}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'`,
    image: data?.uri?.replace("gs://", "https://storage.googleapis.com/"),
    label: { style, category },
    score: score,
  };
};

function DetailsScreen({ navigation, route }) {
  const [data, setdata] = useState(null);

  const getData = async () => {
    const temp = await fetchData(route?.params?.response);

    let results = temp?.responses[0]?.productSearchResults?.results?.map(
      (item) => getImages(item)
    );
    results = await Promise.all(results);

    setdata(results);
  };

  useEffect(() => {
    if (!route?.params?.response) {
      navigation.goBack();
    } else {
      getData();
    }
  }, []);

  if (!data)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <ActivityIndicator size={64} color="white" style={{ marginTop: 24 }} />
      </View>
    );

  return (
    <ScrollView
      style={{
        flex: 1,
        width: width,
        paddingTop: 32,
        backgroundColor: "black",
      }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexWrap: "wrap",
        flexDirection: "row",
        paddingBottom: 32,
      }}
      showsVerticalScrollIndicator={false}
    >
      {data?.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              width: width * 0.4,
              height: height * 0.4,
              justifyContent: "center",
              alignItems: "center",
              margin: width * 0.045,
              marginTop: 16,
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                height: "80%",
                borderRadius: 8,
                alignSelf: "center",
                borderWidth: 1,
                borderColor: "white",
              }}
              onPress={() => Linking.openURL(item.link)}
              activeOpacity={0.8}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 8,
                }}
                resizeMode="contain"
                source={{ uri: item?.image }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "white",
                opacity: 0.9,
                marginTop: 6,
              }}
            >
              Score : {item?.score}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "white",
                opacity: 0.8,
                marginTop: 2,
              }}
            >
              Style : {item?.label?.style}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "white",
                opacity: 0.8,
                marginTop: 2,
              }}
            >
              Category : {item?.label?.category}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

export default DetailsScreen;

{
  /* <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        horizontal
        contentContainerStyle={{flexWrap:'wrap'}}
        style={{marginTop: 32,width:width,flexWrap:'wrap'}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: width * 0.4,
                height: height * 0.3,
                marginTop: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin:width*0.05
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 8,
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: 'white',
                }}
                resizeMode='contain'
                source={{uri: item?.image}}
              />
               <View style={{width: '66%', marginTop: -32}}>
                <Text
                  onPress={() => Linking.openURL(item.link)}
                  numberOfLines={2}
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: 'lightblue',
                  }}>
                  {item.link}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'white',
                    opacity: 0.9,
                    marginTop: 6,
                  }}>
                  Score : {item?.score}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'white',
                    opacity: 0.8,
                    marginTop: 2,
                  }}>
                  Style : {item?.label?.style}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'white',
                    opacity: 0.8,
                    marginTop: 2,
                  }}>
                  Category : {item?.label?.category}
                </Text>
              </View> 
              </View>
              );
            }}
          />  */
}
