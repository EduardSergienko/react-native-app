import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import RegistrationScreen from "./Screens/RegistrationScreen";

export default function App() {
  const [isShowKeyboard, setisShowKeyboard] = useState(false);

  const keyboardShowing = () => {
    setisShowKeyboard(true);
  };

  const hideKeyboard = () => {
    setisShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ImageBackground
          style={styles.bgrImg}
          source={require("./assets/img/Photo_BG.jpg")}
        ></ImageBackground>
        <RegistrationScreen
          keyboardStatus={isShowKeyboard}
          keyboardHide={hideKeyboard}
          keyboardShowing={keyboardShowing}
        />
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "flex-end",
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
  form: {
    // width: 300,
    // backgroundColor: `#ffffff`,
    // borderColor: "black",
    // borderStyle: "solid",
    // borderWidth: 2,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});
