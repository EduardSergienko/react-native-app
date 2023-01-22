import { Text, View, Image, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
export default function PostsScreen({ route }) {
  const [postsData, setpostsData] = useState([]);
  useEffect(() => {
    if (route.params) {
      setpostsData((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.postsList}
        data={postsData}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Image source={{ uri: item.postPhoto }} style={styles.postImg} />
            <Text>{item.postName}</Text>
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
    marginBottom: 10,
    borderRadius: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  postImg: {
    width: 343,
    height: 240,
    borderRadius: 10,
  },
});
