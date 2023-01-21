import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
export default function CreatePostScreen() {
  const [cameraData, setcameraData] = useState();
  const [photo, setphoto] = useState(null);
  console.log(photo);
  const takePhoto = async () => {
    const photo = await cameraData.takePictureAsync();
    setphoto(photo.uri);
  };

  return (
    <View style={styles.container}>
      <Camera
        onCameraReady={true}
        ref={setcameraData}
        type={CameraType.back}
        style={styles.camera}
      >
        <View style={styles.photoContainer}>
          <Image style={{ width: 150, height: 150 }} source={{ uri: photo }} />
        </View>
        <TouchableOpacity onPress={takePhoto} style={styles.cameraBtn}>
          <Ionicons name="md-camera-sharp" size={24} color="grey" />
        </TouchableOpacity>
      </Camera>
      <Text>Upload photo</Text>
      <TextInput
        style={{ borderBottomWidth: 1, borderColor: "grey", marginTop: 5 }}
        placeholder="Name..."
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
    // justifyContent: "center",
    // alignItems: "center",
  },
  camera: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBtn: {
    borderWidth: 1,

    padding: 15,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  photoContainer: {
    position: "absolute",
    top: 0,
    left: 0,

    borderWidth: 1,
    borderColor: "grey",
  },
});
