import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ImageBackground,
} from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgrImg}
        source={require("./assets/img/Photo_BG.jpg")}
      >
        <RegistrationScreen />
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: "center",
    // justifyContent: "center",
  },
  bgrImg: {
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
