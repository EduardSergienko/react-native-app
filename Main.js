import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/mainScreens/Home";
import CommentsScreen from "./Screens/mainScreens/CommentsScreen";
import MapScreen from "./Screens/mainScreens/MapScreen";
import { useRotes } from "./routes/routes";
import { authStateChange } from "./redux/auth/autnOperation";
export default function Main() {
  const AuthStack = createNativeStackNavigator();
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChange());
  }, []);
  const routes = useRotes(stateChange);
  return (
    <NavigationContainer>
      {routes}
      {/* <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <AuthStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <AuthStack.Screen
          options={{ headerTitleAlign: "center" }}
          name="Comments"
          component={CommentsScreen}
        />
        <AuthStack.Screen
          options={{ headerTitleAlign: "center" }}
          name="Map"
          component={MapScreen}
        />
      </AuthStack.Navigator> */}
    </NavigationContainer>
  );
}
