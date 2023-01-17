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
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback } from "react";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

export default function App() {
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regulat": require("./fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const hideKeyboard = () => {
    setisShowKeyboard(false);
    Keyboard.dismiss();
  };

  const keyboardShowing = () => {
    setisShowKeyboard(true);
  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        onLayout={onLayoutRootView}
      >
        <ImageBackground
          style={styles.bgrImg}
          source={require("./assets/img/Photo_BG.jpg")}
        ></ImageBackground>
        <RegistrationScreen
          checkKeyboardStatus={isShowKeyboard}
          keyboardHide={hideKeyboard}
          keyboardShowing={keyboardShowing}
        />
        {/* <LoginScreen
          checkKeyboardStatus={isShowKeyboard}
          keyboardHide={hideKeyboard}
          keyboardShowing={keyboardShowing}
        /> */}
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
