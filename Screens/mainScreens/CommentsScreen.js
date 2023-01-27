import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { doc, collection, addDoc } from "firebase/firestore";
import { store } from "../../config";

export default function CommentsScreen({ route }) {
  const { id } = route.params;
  console.log(id);
  const [photo, setphoto] = useState(null);
  const [comment, setComment] = useState("");
  console.log(comment);
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  useEffect(() => {
    if (route.params) {
      console.log(route.params);
      setphoto(route.params.photo);
    }
  }, []);
  const createComment = async () => {
    const washingtonRef = await doc(store, "posts", `${id}`);
    const dateOptions = { year: "numeric", month: "long", day: "numeric", time: "numeric" };
    const timeOptions = { formatMatcher: "hour" };
    const date = new Date().toLocaleDateString("en-GB", dateOptions);
    const time = new Date().toLocaleTimeString("en-GB").slice(0, 6);
    console.log(date);
    const docRef = await addDoc(collection(washingtonRef, "comments"), {
      comment,
      date: date + " " + "|" + " " + time,
    });
    setisShowKeyboard(false);
    Keyboard.dismiss();
    setComment("");
    // await updateDoc(washingtonRef, {
    //   comments: { comment },
    // });
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
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: photo }} />
      <View
        style={{
          ...styles.inputWrap,
          bottom: isShowKeyboard && Platform.OS === "ios" ? 230 : 20,
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
    position: "absolute",
    // bottom: 20,
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
});
