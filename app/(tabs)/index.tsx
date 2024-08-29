import Chat from "@/components/Chat";
import { Fonts } from "@/constants/Fonts";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 5,
      }}
    >
      <Text style={styles.title}>Chats</Text>
      <Chat to="/chat/134" />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 27,
    fontFamily: Fonts.semiBold,
    paddingBottom: 30,
  },
});
