import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";

export default function LoginScreen({
  keyboardShowing,
  keyboardStatus,
  keyboardHide,
}) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassworHiden, setIsPassworShowing] = useState(true);
  const [togleBtnText, setTogleBtnText] = useState("Show");

  const handleShowPassword = () => {
    if (isPassworHiden) {
      setIsPassworShowing(false);
      setTogleBtnText("Hide");
    } else {
      setIsPassworShowing(true);
      setTogleBtnText("Show");
    }
  };

  const handleLoginText = (text) => setLogin(text);
  const handleEmailText = (text) => setEmail(text);
  const handlePasswordText = (text) => setPassword(text);
  const onLogin = () => {
    Alert.alert("Credentials", `${login} + ${email} + ${password}`);
  };
  return (
    <View style={{ ...styles.wrap, marginBottom: keyboardStatus ? -155 : 0 }}>
      <Text style={styles.registration}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onFocus={keyboardShowing}
          onSubmitEditing={keyboardHide}
          value={email}
          onChangeText={handleEmailText}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onFocus={keyboardShowing}
          onSubmitEditing={keyboardHide}
          secureTextEntry={isPassworHiden}
          value={password}
          onChangeText={handlePasswordText}
        />
        <TouchableOpacity
          onPress={(keyboardHide, onLogin)}
          activeOpacity={0.7}
          style={styles.regBtn}
        >
          <Text style={styles.btnTitle}>Login</Text>
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
    paddingTop: 31,
    paddingBottom: 50,

    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  registration: {
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
    marginBottom: 43,
  },
  btnTitle: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  signInLink: {
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
    bottom: 110,
  },
  passwordVisibleTogleText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
