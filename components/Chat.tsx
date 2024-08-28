import { Fonts } from "@/constants/Fonts";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Avatar from "./Avatar";

const Chat = () => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#F0F0F0" : "transparent",
        },
        styles.container,
      ]}
    >
      <View style={styles.userWrapper}>
        <Avatar text="rn" />
        <View>
          <Text style={styles.userName}>Robert Ngabo</Text>
          <Text style={styles.message}>come up , i'm at cafe</Text>
        </View>
      </View>
      <View>
        <Text style={styles.timestamp}>2 minutes ago</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userWrapper: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    paddingBottom: 3,
  },
  message: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: "grey",
  },
  timestamp: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: "grey",
  },
});

export default Chat;
