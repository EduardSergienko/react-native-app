import { Text, View, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { query, onSnapshot, collection } from "firebase/firestore";
import { store } from "../../config";
import { useState, useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
export default function PostsScreen({ navigation }) {
  const defaultAvatar =
    "https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";

  const [postsData, setpostsData] = useState(null);
  const userState = useSelector((state) => state.auth);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const q = query(collection(store, "posts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setpostsData(data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  const handleCommentsShow = (photo, id) => {
    navigation.navigate("Comments", { photo, id });
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={styles.userInfoAvatar}
          source={{ uri: userState.userAvatar ? userState.userAvatar : defaultAvatar }}
        />
        <View>
          <Text style={styles.userName}>{userState.userName}</Text>
          <Text style={styles.userEmail}>{userState.userEmail}</Text>
        </View>
      </View>
      <FlatList
        style={styles.postsList}
        data={postsData}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Image source={{ uri: item.photo }} style={styles.postImg} />
            <Text>{item.postMessage}</Text>
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
                <TouchableOpacity onPress={() => handleCommentsShow(item.photo, item.id)}>
                  <EvilIcons name="comment" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={{ color: "#BDBDBD", marginLeft: 10 }}>0</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Map", {
                      latitude: item.location.latitude,
                      longitude: item.location.longitude,
                    })
                  }
                >
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
    // paddingTop: 15,
  },
  postsList: {
    paddingTop: 15,
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
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: 343,
    marginLeft: "auto",
    marginRight: "auto",

    paddingVertical: 15,
  },
  userInfoAvatar: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontFamily: "Roboto-Regulat",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regulat",

    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
