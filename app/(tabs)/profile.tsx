import Avatar from "@/components/Avatar";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const ProfileScreen = () => {
  const [displayName, setDisplayName] = useState("");

  const avatarText = displayName
    ? `${displayName.split(" ")[0]?.[0] ?? ""}${displayName.split(" ")[1]?.[0] ?? ""}`
    : "";

  const handleChangeDisplayName = () => {
    if (!displayName) {
      Alert.alert("Error", "Please enter a display name");
      return;
    }
    Alert.alert("Changed");
  };

  return (
    <View style={styles.container}>
      <Avatar text={avatarText} size="lg" />
      <TextInput
        placeholder="Display Name"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
        style={styles.input}
      />
      <View style={{ marginTop: 13 }}>
        <Pressable style={styles.button} onPress={handleChangeDisplayName}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#F2F2F2",
    color: "black",
    fontFamily: Fonts.medium,
    fontSize: 16,
    borderWidth: 1,
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: "100%",
  },
  buttonText: {
    fontFamily: Fonts.semiBold,
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default ProfileScreen;
