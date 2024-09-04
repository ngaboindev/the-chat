import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Fonts } from "./Fonts";

export const Styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    fontSize: 16,
    color: "#333333",
  },
});
