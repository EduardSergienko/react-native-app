import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { doc, collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { store } from "../../config";

export default function CommentsScreen({ route }) {
  const { id } = route.params;

  const [photo, setphoto] = useState(null);
  const [comment, setComment] = useState("");
  const [allComments, setallComments] = useState(null);

  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  useEffect(() => {
    if (route.params) {
      setphoto(route.params.photo);
      getAllComments();
    }
  }, []);
  const createComment = async () => {
    if (comment !== "") {
      try {
        const postsRef = await doc(store, "posts", `${id}`);
        const dateOptions = { year: "numeric", month: "long", day: "numeric", time: "numeric" };
        const commentDate = [];
        const date = commentDate.push(new Date().toLocaleDateString("en-GB", dateOptions));
        const time = commentDate.push(new Date().toLocaleTimeString("en-GB").slice(0, 5));

        const docRef = await addDoc(collection(postsRef, "comments"), {
          comment,
          date: commentDate.join(" | "),
        });
        setisShowKeyboard(false);
        Keyboard.dismiss();
        setComment("");
      } catch (error) {}
    } else {
      Alert.alert("Please, add some comment...");
    }
  };
  const getAllComments = async () => {
    try {
      const postsCollection = query(collection(store, "posts", `${id}`, "comments"));
      onSnapshot(postsCollection, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setallComments(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const hideKeyboard = () => {
    setisShowKeyboard(false);
    Keyboard.dismiss();
  };

  const keyboardShowing = () => {
    setisShowKeyboard(true);
  };
  const handleComment = (text) => {
    setComment(text);
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View onStartShouldSetResponder={() => true} style={styles.container}>
        <Image style={styles.img} source={{ uri: photo }} />
        <FlatList
          style={styles.commentList}
          data={allComments}
          renderItem={({ item }) => (
            <View onStartShouldSetResponder={() => true} style={styles.commentContainer}>
              <View style={styles.userAvatar}></View>
              <View style={styles.commentWrap}>
                <Text style={styles.comment}>{item.comment}</Text>
                <Text style={styles.commentDate}>{item.date}</Text>
              </View>
            </View>
          )}
        ></FlatList>
        <View
          style={{
            ...styles.inputWrap,
            marginBottom: isShowKeyboard && Platform.OS === "ios" ? 350 : 20,
          }}
        >
          <TextInput
            onFocus={keyboardShowing}
            onSubmitEditing={hideKeyboard}
            onChangeText={handleComment}
            value={comment}
            style={styles.input}
            placeholder="Add comment..."
          ></TextInput>
          <TouchableOpacity onPress={createComment} style={styles.addCommentBtn}>
            <AntDesign name="arrowup" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },
  img: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  inputWrap: {
    // position: "absolute",
    // bottom:  20,
    marginBottom: 20,
    width: 343,
  },
  input: {
    fontFamily: "Roboto-Regulat",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,

    marginTop: 25,
    padding: 16,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  addCommentBtn: {
    position: "absolute",
    right: 10,
    top: "36%",
    padding: 11,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    borderWidth: 0,
  },
  commentList: {
    paddingTop: 25,
  },
  commentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  commentWrap: {
    width: 299,
    marginBottom: 25,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderBottomRightRadius: 10,
    borderBottomStartRadius: 10,
    borderTopRightRadius: 10,
  },
  commentDate: {
    fontFamily: "Roboto-Regulat",
    textAlign: "right",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  comment: {
    fontFamily: "Roboto-Regulat",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 10,
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "grey",
    marginRight: 15,
  },
});
