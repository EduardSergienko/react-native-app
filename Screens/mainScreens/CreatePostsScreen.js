import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { AutoFocus, Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
export default function CreatePostScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraData, setcameraData] = useState();
  const [photo, setphoto] = useState(null);
  const [postData, setpostData] = useState({});
  const [photoAction, setphotoAction] = useState("Load photo");
  const [isCreateBtnDisabled, setisCreateBtnDisabled] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        setHasPermission("granted");
      }
    })();
  }, []);
  const takePhoto = async () => {
    const photo = await cameraData.takePictureAsync();
    setphoto(photo.uri);
    setpostData((prevState) => ({ ...prevState, postPhoto: photo.uri }));
    setphotoAction("Edit photo");
    setisCreateBtnDisabled(false);
  };
  const takeNewPhoto = () => {
    setphoto(null);
    setphotoAction("Load photo");
    setisCreateBtnDisabled(true);
  };
  const handlePostName = (text) => {
    setpostData((prevState) => ({ ...prevState, postName: text }));
  };
  const handlePostLocation = (text) => {
    setpostData((prevState) => ({ ...prevState, postLocation: text }));
  };
  const crestePost = () => {
    if (photo) {
      navigation.navigate("Posts", postData);
      setpostData({});
      setphoto(null);
      setphotoAction("Load photo");
      setisCreateBtnDisabled(true);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndica style={styles.container}>
      <View style={{ paddingBottom: 25 }}>
        <View style={{ borderWidth: 0, borderRadius: 8, overflow: "hidden" }}>
          {!photo ? (
            <Camera
              ref={setcameraData}
              type={CameraType.back}
              style={styles.camera}
            >
              <TouchableOpacity onPress={takePhoto} style={styles.cameraBtn}>
                <Ionicons name="md-camera-sharp" size={30} color="white" />
              </TouchableOpacity>
            </Camera>
          ) : (
            <View style={styles.photoContainer}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri: photo }}
              />
              {/* <TouchableOpacity
                onPress={takeNewPhoto}
                style={styles.makeNewPhoto}
              >
                <Ionicons name="md-camera-sharp" size={30} color="white" />
              </TouchableOpacity> */}
            </View>
          )}
        </View>

        <Text style={styles.photoActionText}>{photoAction}</Text>
        <View style={styles.inputsContainer}>
          <TextInput
            onChangeText={handlePostName}
            placeholderTextColor={"#BDBDBD"}
            style={styles.nameInput}
            placeholder="Name..."
            value={postData.postName}
          ></TextInput>
          <TextInput
            onChangeText={handlePostLocation}
            placeholderTextColor={"#BDBDBD"}
            style={styles.locationInput}
            placeholder="Location..."
            value={postData.postLocation}
          ></TextInput>

          <EvilIcons
            style={{ position: "absolute", top: 80, left: -5 }}
            name="location"
            size={30}
            color="#BDBDBD"
          />
          <TouchableOpacity
            disabled={isCreateBtnDisabled}
            onPress={crestePost}
            style={
              isCreateBtnDisabled
                ? styles.disabledCreatePostBtn
                : styles.createPostBtn
            }
          >
            <Text
              style={{
                ...styles.createPostBtnText,
                color: !isCreateBtnDisabled ? "white" : "#BDBDBD",
              }}
            >
              Create Post
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={isCreateBtnDisabled}
          onPress={takeNewPhoto}
          style={styles.deletePhoto}
        >
          <AntDesign name="delete" size={20} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
    paddingBottom: 25,
  },
  camera: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBtn: {
    position: "relative",
    zIndex: 100,
    padding: 20,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  photoContainer: {
    width: "100%",
    height: 300,
  },
  // makeNewPhoto: {
  //   position: "absolute",
  //   top: 115,
  //   left: 140,
  //   borderWidth: 0,
  //   padding: 20,
  //   borderRadius: 50,
  //   backgroundColor: "rgba(255, 255, 255, 0.3)",
  // },
  photoActionText: {
    fontFamily: "Roboto-Regulat",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,
  },
  inputsContainer: {
    marginTop: 32,
    marginBottom: 120,
  },
  nameInput: {
    fontFamily: "Roboto-Regulat",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
    marginBottom: 16,
    height: 50,
  },
  locationInput: {
    fontFamily: "Roboto-Regulat",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
    height: 50,
    paddingLeft: 30,
  },
  createPostBtn: {
    paddingHorizontal: "auto",
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 50,
  },
  disabledCreatePostBtn: {
    paddingHorizontal: "auto",
    paddingVertical: 16,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 50,
  },
  createPostBtnText: {
    ontFamily: "Roboto-Regulat",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  deletePhoto: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 23,
    paddingVertical: 8,
    width: 70,
    alignItems: "center",
    borderRadius: 30,
  },
});
