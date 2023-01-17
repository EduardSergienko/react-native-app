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
  const [fontsLoaded] = useFonts({
    "Roboto-Regulat": require("./fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./fonts/Roboto-Medium.ttf"),
  });

  const initialRegisterState = {
    login: "",
    email: "",
    password: "",
  };
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const [registerFormData, setregisterFormData] =
    useState(initialRegisterState);
  const [formData, setformData] = useState({});
  const { login, password, email } = formData;

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleLoginText = (text) =>
    setregisterFormData((prevState) => ({ ...prevState, login: text }));
  const handleEmailText = (text) =>
    setregisterFormData((prevState) => ({ ...prevState, email: text }));
  const handlePasswordText = (text) =>
    setregisterFormData((prevState) => ({ ...prevState, password: text }));

  const keyboardShowing = () => {
    setisShowKeyboard(true);
    setIsInputOnFocus(true);
  };

  const hideKeyboard = () => {
    setisShowKeyboard(false);
    setIsInputOnFocus(false);

    Keyboard.dismiss();
  };
  const onFormSubmit = () => {
    setformData(registerFormData);
    setregisterFormData(initialRegisterState);

    Keyboard.dismiss();
  };
  console.log("Credentials", `${login} + ${email} + ${password}`);
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
          keyboardStatus={isShowKeyboard}
          keyboardHide={hideKeyboard}
          keyboardShowing={keyboardShowing}
          inputFocus={isInputOnFocus}
          formData={registerFormData}
          loginChange={handleLoginText}
          emailChange={handleEmailText}
          passwordChange={handlePasswordText}
          onSubmit={onFormSubmit}
        />
        {/* <LoginScreen
          keyboardStatus={isShowKeyboard}
          keyboardHide={hideKeyboard}
          keyboardShowing={keyboardShowing}
          emailChange={handleEmailText}
          passwordChange={handlePasswordText}
          onSubmit={onFormSubmit}
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
