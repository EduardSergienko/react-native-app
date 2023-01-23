import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TurboModuleRegistry,
} from "react-native";
import { useState, useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
export default function PostsScreen({ navigation, route }) {
  const [postsData, setpostsData] = useState([]);
  useEffect(() => {
    if (route.params) {
      setpostsData((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  const handleCommentsShow = (photo) => {
    navigation.navigate("Comments", { photo });
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.postsList}
        data={postsData}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Image source={{ uri: item.postPhoto }} style={styles.postImg} />
            <Text>{item.postName}</Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() => handleCommentsShow(item.postPhoto)}
                >
                  <EvilIcons name="comment" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={{ color: "#BDBDBD", marginLeft: 10 }}>0</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity>
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={styles.postLocationText}>{item.postLocation}</Text>
              </View>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },

  postItem: {
    marginBottom: 34,
    borderRadius: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  postImg: {
    width: 343,
    height: 240,
    borderRadius: 10,
    marginBottom: 8,
  },
  postLocationText: {
    fontFamily: "Roboto-Regulat",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
    marginLeft: 5,
  },
});
