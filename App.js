import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRotes } from "./routes/routes";
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

// export const togle = () => {
//   if (!status) {
//     setstatus(true);
//   } else {
//     setstatus(false);
//   }
// };
