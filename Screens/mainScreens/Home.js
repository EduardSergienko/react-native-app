import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
const NavTab = createBottomTabNavigator();
export default function Home() {
  return (
    <NavTab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: { height: 70 },
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
            <TouchableOpacity style={{ paddingRight: 20 }}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NavTab.Screen
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
        }}
        name="Create"
        component={CreatePostScreen}
      />
      <NavTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </NavTab.Navigator>
  );
}

//  style={{
//                 backgroundColor: "#FF6C00",
//                 textAlign: "center",
//                 paddingHorizontal: 10,
//                 borderRadius: 20,
//               }}
