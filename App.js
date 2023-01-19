import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/mainScreens/PostsScreen";
import CreatePostScreen from "./Screens/mainScreens/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreens/ProfileScreen";

const AuthStack = createNativeStackNavigator();
const NavTab = createBottomTabNavigator();

const useRotes = (isLogedIn) => {
  if (!isLogedIn) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <NavTab.Navigator>
      <NavTab.Screen
        options={{ headerShown: false, tabBarShowLabel: false }}
        name="Posts"
        component={PostsScreen}
      />
      <NavTab.Screen
        options={{ headerShown: false, tabBarShowLabel: false }}
        name="Create"
        component={CreatePostScreen}
      />
      <NavTab.Screen
        options={{ headerShown: false, tabBarShowLabel: false }}
        name="Profile"
        component={ProfileScreen}
      />
    </NavTab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regulat": require("./fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const routes = useRotes(true);
  return <NavigationContainer>{routes}</NavigationContainer>;
}
