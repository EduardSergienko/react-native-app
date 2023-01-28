import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { store } from "../../config";
import { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [userPostsData, setuserPostsData] = useState(null);
  console.log(userPostsData);
  const { userId } = useSelector((state) => state.auth);
  const getCurrentUserPosts = async () => {
    try {
      const q = await query(collection(store, "posts"), where("userId", "==", userId));
      onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data() });
        });
        setuserPostsData(data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrentUserPosts();
  }, []);
  const handleCommentsShow = (photo, id) => {
    navigation.navigate("Comments", { photo, id });
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.postsList}
        data={userPostsData}
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
