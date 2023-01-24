import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
export default function CommentsScreen({ route }) {
  const [photo, setphoto] = useState(null);
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  useEffect(() => {
    if (route.params) {
      setphoto(route.params.photo);
    }
  }, []);
  const hideKeyboard = () => {
    setisShowKeyboard(false);
    Keyboard.dismiss();
  };

  const keyboardShowing = () => {
    setisShowKeyboard(true);
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
          style={styles.input}
          placeholder="Add comment..."
        ></TextInput>
        <TouchableOpacity style={styles.addCommentBtn}>
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
