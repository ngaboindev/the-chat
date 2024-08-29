import { Fonts } from "@/constants/Fonts";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  color?: string;
  size?: string;
  text: string;
};

function Avatar({ text, color, size }: Props) {
  const sizeStyle: { [key: string]: any } = {
    sm: styles.avatarSm,
    md: styles.avatarMd,
    lg: styles.avatarLg,
  };

  const avatarTextSize: { [key: string]: any } = {
    sm: 20,
    md: 25,
    lg: 50,
  };

  const selectedSizeStyle = size ? sizeStyle[size] : sizeStyle.md;
  const selectedTextSize = size
    ? { fontSize: avatarTextSize[size] }
    : { fontSize: avatarTextSize.md };

  const avatarColor = color
    ? { backgroundColor: color }
    : {
        backgroundColor: "lightgrey",
      };

  return (
    <View style={[styles.avatar, avatarColor, selectedSizeStyle]}>
      <Text style={[styles.avatarText, selectedTextSize]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarSm: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  avatarMd: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
  },
  avatarLg: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: Fonts.medium,
    textTransform: "uppercase",
  },
});

export default Avatar;
