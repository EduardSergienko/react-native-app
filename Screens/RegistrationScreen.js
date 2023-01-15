import { StyleSheet, TextInput, View, Text } from "react-native";

export default function RegistrationScreen() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.registration}>Registration</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder={"Login"} />
        <TextInput style={styles.input} placeholder={"Email"} />
        <TextInput style={styles.input} placeholder={"Password"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#FFFFFF",
    paddingTop: 92,
    width: "100%",
  },
  registration: {
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.03,
    color: "#212121",
  },
  form: {
    marginHorizontal: 25,
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
});
