import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
} from "react-native";
import { useState } from "react";

export default function RegistrationScreen({
  keyboardHide,
  checkKeyboardStatus,
  keyboardShowing,
}) {
  const initialRegisterState = {
    email: "",
    password: "",
  };

  const [registerFormData, setregisterFormData] =
    useState(initialRegisterState);
  const [formData, setformData] = useState({});
  const { password, email } = formData;
  const [isPassworHiden, setIsPassworShowing] = useState(true);
  const [togleBtnText, setTogleBtnText] = useState("Show");

  const handleEmailText = (text) =>
    setregisterFormData((prevState) => ({ ...prevState, email: text }));
  const handlePasswordText = (text) =>
    setregisterFormData((prevState) => ({ ...prevState, password: text }));

  const onFormSubmit = () => {
    setformData(registerFormData);
    setregisterFormData(initialRegisterState);

    Keyboard.dismiss();
  };

  const handleShowPassword = () => {
    if (isPassworHiden) {
      setIsPassworShowing(false);
      setTogleBtnText("Hide");
    } else {
      setIsPassworShowing(true);
      setTogleBtnText("Show");
    }
  };
  console.log("Credentials", ` ${email} + ${password}`);

  return (
    <View
      style={{ ...styles.wrap, marginBottom: checkKeyboardStatus ? -200 : 0 }}
    >
      <Text style={styles.login}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onFocus={keyboardShowing}
          onSubmitEditing={keyboardHide}
          value={registerFormData.email}
          onChangeText={handleEmailText}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onFocus={keyboardShowing}
          onSubmitEditing={keyboardHide}
          secureTextEntry={isPassworHiden}
          value={registerFormData.password}
          onChangeText={handlePasswordText}
        />
        <TouchableOpacity
          onPress={(keyboardHide, onFormSubmit)}
          activeOpacity={0.7}
          style={styles.regBtn}
        >
          <Text style={styles.btnTitle}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShowPassword}
          activeOpacity={0.7}
          style={styles.passwordVisibleTogle}
        >
          <Text style={styles.passwordVisibleTogleText}>{togleBtnText}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.signInLink}>Don't have an account? Sign up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    display: "flex",
    backgroundColor: "#FFFFFF",
    paddingTop: 92,
    paddingBottom: 50,

    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  login: {
    fontFamily: "Roboto-Bold",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.03,
    color: "#212121",
    marginBottom: 32,
  },
  form: {
    marginBottom: 16,
  },
  input: {
    width: 343,
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
  },
  regBtn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    marginTop: 43,
  },
  btnTitle: {
    fontFamily: "Roboto-Regulat",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  signInLink: {
    fontFamily: "Roboto-Regulat",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
    textAlign: "center",
    color: "#1B4371",
  },

  passwordVisibleTogle: {
    position: "absolute",
    right: 15,
    bottom: 120,
  },
  passwordVisibleTogleText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
