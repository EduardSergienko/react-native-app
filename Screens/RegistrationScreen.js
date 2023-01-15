import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function RegistrationScreen({
  keyboardShowing,
  keyboardStatus,
  keyboardHide,
}) {
  return (
    <View style={{ ...styles.wrap, marginBottom: keyboardStatus ? -155 : 0 }}>
      <Text style={styles.registration}>Registration</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={"Login"}
          onFocus={keyboardShowing}
          onSubmitEditing={keyboardHide}
        />
        <TextInput
          style={styles.input}
          placeholder={"Email"}
          onFocus={keyboardShowing}
          onSubmitEditing={keyboardHide}
        />
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          onFocus={keyboardShowing}
          onSubmitEditing={keyboardHide}
        />
        <TouchableOpacity
          onPress={keyboardHide}
          activeOpacity={0.7}
          style={styles.regBtn}
        >
          <Text style={styles.btnTitle}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.signInLink}>Already have an account? Sign in</Text>
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
});
