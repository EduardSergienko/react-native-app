import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import { uuidv4 } from "@firebase/util";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../../config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { store } from "../../config";

export default function CreatePostScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraData, setcameraData] = useState();
  const [photo, setphoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [postData, setpostData] = useState({});
  const [photoAction, setphotoAction] = useState("Load photo");
  const [isCreateBtnDisabled, setisCreateBtnDisabled] = useState(true);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [isEnabled, setIsEnabled] = useState(false);

  const { userId, userName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      if (status && locationStatus === "granted") {
        setHasPermission("granted");
      }
      const { coords } = await Location.getCurrentPositionAsync({});

      setLocation(coords);
      setpostData((prevState) => ({
        ...prevState,

        latitude: coords.latitude,
        longitude: coords.longitude,
      }));
    })();
  }, []);
  const takePhoto = async () => {
    const photo = await cameraData.takePictureAsync();

    setphoto(photo.uri);
    setpostData((prevState) => ({
      ...prevState,
      postPhoto: photo.uri,
    }));

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
  const handleCameraFlip = () => {
    if (cameraType === CameraType.back) {
      setCameraType(CameraType.front);
    } else {
      setCameraType(CameraType.back);
    }
  };
  const handleCameraFlashMode = () => {
    if (flashMode === FlashMode.off) {
      setFlashMode(FlashMode.on);
    } else {
      setFlashMode(FlashMode.off);
    }
  };
  const crestePost = () => {
    uploadPostToServer();
    if (photo) {
      navigation.navigate("Posts");
      setpostData({});
      setphoto(null);
      setphotoAction("Load photo");
      setisCreateBtnDisabled(true);
    }
  };
  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();

      const docRef = await addDoc(collection(store, "posts"), {
        userId,
        userName,
        photo,
        location,
        postMessage: postData.postName || "",
        postLocation: postData.postLocation || "",
        date: Date.now(),
        private: isEnabled,
        commentAmount: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const id = uuidv4();

    const storage = getStorage(db);
    const storageRef = ref(storage, `postImage/${id}`);

    const data = await uploadBytes(storageRef, file);

    const getCurrentPhoto = await getDownloadURL(ref(storage, `postImage/${id}`));
    return getCurrentPhoto;
  };
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <ScrollView showsVerticalScrollIndica style={styles.container}>
      <View style={{ paddingBottom: 25 }}>
        <View style={{ borderWidth: 0, borderRadius: 8, overflow: "hidden" }}>
          {!photo ? (
            <Camera
              flashMode={flashMode}
              ref={setcameraData}
              type={cameraType}
              style={styles.camera}
            >
              <View style={styles.topBtnContainer}>
                <TouchableOpacity onPress={handleCameraFlashMode} style={styles.flashbtn}>
                  <Entypo
                    name="flash"
                    size={25}
                    color={flashMode === FlashMode.on ? "yellow" : "white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCameraFlip} style={styles.flipCameraBtn}>
                  <MaterialCommunityIcons name="camera-flip-outline" size={25} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.bottomBtnContainer}>
                <TouchableOpacity onPress={takePhoto} style={styles.cameraBtn}>
                  <Ionicons name="md-camera-sharp" size={30} color="white" />
                </TouchableOpacity>
              </View>
            </Camera>
          ) : (
            <View style={styles.photoContainer}>
              <Image
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                source={{ uri: photo }}
              />
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
            cursorColor="#FF6C00"
          ></TextInput>
          <TextInput
            onChangeText={handlePostLocation}
            placeholderTextColor={"#BDBDBD"}
            style={styles.locationInput}
            placeholder="Location..."
            value={postData.postLocation}
            cursorColor="#FF6C00"
          ></TextInput>

          <EvilIcons
            style={{ position: "absolute", top: 80, left: -5 }}
            name="location"
            size={30}
            color="#BDBDBD"
          />
          <View style={styles.switchContainer}>
            <Text>Public</Text>
            <Switch
              style={{ marginHorizontal: 15 }}
              trackColor={{ false: "#767577", true: "#eef0eb" }}
              thumbColor={isEnabled ? "#FF6C00" : "#eef0eb"}
              ios_backgroundColor="#e0dfdc"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text>Private</Text>
          </View>

          <TouchableOpacity
            disabled={isCreateBtnDisabled}
            onPress={crestePost}
            style={isCreateBtnDisabled ? styles.disabledCreatePostBtn : styles.createPostBtn}
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
    height: 500,
    justifyContent: "space-between",
    alignItems: "center",
  },
  cameraBtn: {
    position: "relative",
    marginBottom: 20,
    padding: 20,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  topBtnContainer: {
    width: "100%",
    paddingTop: 20,
    flexDirection: "row-reverse",
  },
  flashbtn: {
    marginRight: "auto",
    paddingRight: 15,
  },
  flipCameraBtn: {
    paddingLeft: 15,
  },
  photoContainer: {
    width: "100%",
    height: 300,
  },

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
  switchContainer: {
    marginTop: 25,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
