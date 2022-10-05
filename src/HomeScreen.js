import {
  View,
  Text,
  TextInput,
  TextInputComponent,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { height, width } from "../App";
import { regEx_valid_URL } from "../regex";
import * as ImagePicker from "react-native-image-picker";
import { requestCameraPermission } from "./api";
import { getLinks } from "./api";

const rawData = {
  "17875015255877185": {
    Comment_Count: 10,
    Like_Count: 2826,
    Link: "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/118648815_315570743059627_1308103197177898672_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=rCiz4QQCVcwAX_yX2P4&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AT-ErHoG_ePyetF4cEVww20_1eeXrEaDGBeQtvt8SrkBng&oe=6342E54B",
  },
  17916209533459800: {
    Comment_Count: 39,
    Like_Count: 2814,
    Link: "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/119673625_636293253937292_4382472813327898398_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=OUo24axTEVEAX8xmcnt&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AT9Td-de2uCuRgF-qO4yD9TCYDvHx7_F8iv2m_ToZyPY9Q&oe=634304A5",
  },
  17930861828365276: {
    Comment_Count: 39,
    Like_Count: 7638,
    Link: "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/310388286_438188351632272_2106858934374470375_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=tI4MroP_45kAX8ZiCeG&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AT9-kWQo5pvBwSejYsrh7ZTOtm_LkqlRpqopGZC4xC37BQ&oe=63428D8C",
  },
  "17957283311093171": {
    Comment_Count: 1,
    Like_Count: 124,
    Link: "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/309962690_821838048828543_2266273014691144590_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=OSF2gXetbr8AX_SQCnM&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AT_UUUvROa9ELsIVACBYciaMU151hfB6sl9ErRh9K_eZgA&oe=6341EC23",
  },
  "17959039403030695": {
    Comment_Count: 132,
    Like_Count: 17702,
    Link: "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-15/310739160_1854410318284463_7436303167193873163_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=l_DpQQgSIokAX8p2m0-&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AT-BnpFbNilwKlPsOf2ZJRqJjviIxmVPT0a-XYtm4tn2WQ&oe=6342A794",
  },
  "17979932005654757": {
    Comment_Count: 1,
    Like_Count: 118,
    Link: "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/310012587_1125111494813718_1590553870692375819_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=3Z1oxfDpeJQAX8TRrJT&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AT9-oc1RxfeQ8QdeBL9UeR-ITOLJFj-qKJOE4L7Yx5poeQ&oe=6342A229",
  },
  17994101080550658: {
    Comment_Count: 67,
    Like_Count: 11088,
    Link: "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/310407258_8569598136383918_4787304204008364910_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=amBZcF03HAgAX-rRPfU&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AT8630UEnOT3IPaXSdV8BnYhPWCfci8YJOMqnRDVUFQjJg&oe=6342B2AA",
  },
  "18015302152450578": {
    Comment_Count: 19,
    Like_Count: 2655,
    Link: "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-15/310557480_152911670402100_2150629350956819299_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=0a3X95qzGgwAX-RTPFC&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AT-f57j-ehdx2kqMH6Ojmy1k18UrLcBOHIbJgLhbWNEhLw&oe=63431B42",
  },
};

const includeExtra = true;

function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [url, seturl] = useState("");
  const [data, setData] = useState([]);

  const getLinks = async () => {
    try {
      const response = await fetch("https://api-flipkart-2022.herokuapp.com/");
      let json = await response.json();
      json = json ?? rawData;
      const result = Object.values(json);
      const tempData = result.sort((a, b) => {
        if (a.Like_Count > b.Like_Count) return 1;
        else if (b.Like_Count > a.Like_Count) return -1;
        else return 0;
      });
      setData(tempData);
    } catch (e) {
      let json = rawData;
      const result = Object.values(json);
      const tempData = result.sort((a, b) => {
        if (a.Like_Count > b.Like_Count) return 1;
        else if (b.Like_Count > a.Like_Count) return -1;
        else return 0;
      });
      setData(tempData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  const checkurl = () => {
    if (url.length <= 1) return;

    const checkedURL = RegExp(regEx_valid_URL).exec(url);

    if (checkedURL != null) {
      const tempUrl = url;
      seturl("");
      navigation.navigate("Fetch", { link: tempUrl });
    }
  };

  const onButtonPress = React.useCallback((type, options) => {
    const val = requestCameraPermission();
    if (!val) return;
    if (type === "capture") {
      // ImagePicker.launchCamera(options, setResponse);
      ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
          alert(response.customButton);
        } else {
          if (response?.assets[0]?.base64) {
            navigation.navigate("Details", {
              response: response?.assets[0].base64,
            });
          }
        }
      });
    } else {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
          alert(response.customButton);
        } else {
          if (response?.assets[0]?.base64) {
            navigation.navigate("Details", {
              response: response?.assets[0].base64,
            });
          }
        }
      });
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flex: 1,
        backgroundColor: "black",
        paddingTop: 42,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "500",
          textAlign: "center",
          color: "white",
        }}
      >
        Trend Search
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: width - 48,
          backgroundColor: "white",
          alignItems: "center",
          borderRadius: 8,
          marginTop: 16,
        }}
      >
        <Image
          source={require("../assets/search.png")}
          style={{ width: 28, height: 28, marginLeft: 8 }}
        />
        <TextInput
          style={{
            width: "80%",
            fontSize: 18,
            fontWeight: "500",

            color: "grey",
          }}
          value={url}
          onChangeText={(e) => seturl(e)}
          keyboardType="web-search"
          onSubmitEditing={checkurl}
          placeholderTextColor="grey"
          placeholder="Enter Image url"
        />
      </View>

      <View style={{ height: height * 0.6 }}>
        {loading ? (
          <ActivityIndicator
            size={48}
            color="white"
            style={{ marginTop: 32 }}
          />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            onRefresh={getLinks}
            refreshing={false}
            style={{ marginTop: 24 }}
            scrollEventThrottle={16}
            pagingEnabled
            horizontal
            renderItem={({ item, index }) => {
              if (item?.Link?.includes("https://video")) return null;
              // console.log(item);
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("Fetch", { link: item?.Link })
                  }
                  style={{
                    width: width,
                    alignItems: "center",
                    height: "auto",
                  }}
                >
                  <Image
                    source={{ uri: item?.Link, cache: "force-cache" }}
                    style={{
                      height: height * 0.54,
                      width: width * 0.8,
                      resizeMode: "cover",
                      borderRadius: 16,
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onButtonPress(actions[0].type, actions[0].options)}
        >
          <Image
            source={require("../assets/camera.png")}
            style={{
              width: 72,
              height: 72,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onButtonPress(actions[1].type, actions[1].options)}
        >
          <Image
            source={require("../assets/gallery.png")}
            style={{
              width: 72,
              height: 72,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;

const actions = [
  {
    title: "Take Image",
    type: "capture",
    options: {
      saveToPhotos: true,
      mediaType: "photo",
      includeBase64: true,
      includeExtra,
    },
  },
  {
    title: "Select Image",
    type: "library",
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: "photo",
      includeBase64: true,
      includeExtra,
    },
  },
  {
    title: "Take Video",
    type: "capture",
    options: {
      saveToPhotos: true,
      mediaType: "video",
      includeExtra,
    },
  },
  {
    title: "Select Video",
    type: "library",
    options: {
      selectionLimit: 0,
      mediaType: "video",
      includeExtra,
    },
  },
  {
    title: `Select Image or Video\n(mixed)`,
    type: "library",
    options: {
      selectionLimit: 0,
      mediaType: "mixed",
      includeExtra,
    },
  },
];
