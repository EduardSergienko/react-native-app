import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { store } from "../../config";
import { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { userLogOut } from "../../redux/auth/autnOperation";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const defaultAvatar =
    "https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
  const [userPostsData, setuserPostsData] = useState(null);
  const dispatch = useDispatch();
  const { userId, userName, userAvatar } = useSelector((state) => state.auth);
  console.log(userAvatar);
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
      <ImageBackground
        style={styles.bgrImg}
        source={require("../../assets/img/Photo_BG.jpg")}
      ></ImageBackground>
      <View style={styles.profileInfo}>
        <TouchableOpacity style={styles.logOutBtn} onPress={() => dispatch(userLogOut())}>
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <Text style={styles.profileName}>{userName}</Text>
        <View style={styles.avatarContainer}>
          <Image
            style={{ width: 120, height: 120, borderRadius: 16 }}
            source={{ uri: userAvatar ? userAvatar : defaultAvatar }}
          />
          {/* <TouchableOpacity onPress={pickImage} style={styles.addAvatar}>
            <Image style={styles.addAvatar} source={require("../img/add.png")} />
          </TouchableOpacity> */}
        </View>
      </View>
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
    paddingTop: 140,
    height: "100%",
  },
  profileInfo: {
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 15,
    paddingTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarContainer: {
    position: "absolute",
    top: "-55%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  logOutBtn: {
    marginLeft: "auto",
    paddingRight: 40,
    marginBottom: 45,
  },
  profileName: {
    fontFamily: "Roboto-Bold",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
    textAlign: "center",
  },
  postsList: {
    backgroundColor: "white",
    height: "100%",
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
  bgrImg: {
    position: "absolute",
    left: 0,
    top: 0,

    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 40,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
