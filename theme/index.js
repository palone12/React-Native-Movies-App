import { Platform, StatusBar } from "react-native";

export const theme = {
  text: "#eab308",
  background: "#eab308",
};

export const styles = {
  text: { color: theme.text },
  background: { backgroundColor: theme.background },
};

export const safe = {
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
};
