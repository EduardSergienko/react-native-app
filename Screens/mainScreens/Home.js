import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
const NavTab = createBottomTabNavigator();
export default function Home({ navigation }) {
  return (
    <NavTab.Navigator
      initialRouteName="Posts"
      backBehavior="history"
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: { paddingHorizontal: 70, height: 70 },
        tabBarShowLabel: false,
      }}
    >
      <NavTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
          headerRight: ({ focused, color, size }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{ paddingRight: 20 }}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerLeft: ({ focused, color, size }) => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingLeft: 20 }}
            >
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <NavTab.Screen
        name="Create Post"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              style={{
                backgroundColor: "#FF6C00",
                textAlign: "center",
                paddingHorizontal: 28,
                paddingVertical: 10,
                borderRadius: 20,
              }}
              name="md-add"
              size={size}
              color="white"
            />
          ),
          headerLeft: ({ focused, color, size }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Posts")}
              style={{ paddingLeft: 20 }}
            >
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <NavTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          headerRight: ({ focused, color, size }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
              style={{ paddingRight: 20 }}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerLeft: ({ focused, color, size }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Create Post")}
              style={{ paddingLeft: 20 }}
            >
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </NavTab.Navigator>
  );
}
