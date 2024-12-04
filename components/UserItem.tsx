import { Fonts } from "@/constants/Fonts";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Avatar from "./Avatar";

type Props = {
  name: string;
  website?: string;
  onPress?: () => void;
};

const UserItem = ({ name, website, onPress }: Props) => {
  const avatarText = name
    ? `${name.split(" ")[0]?.[0] ?? ""}${name.split(" ")[1]?.[0] ?? ""}`
    : "";
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgba(0,0,0,0.1)" : "transparent",
          padding: 10,
          borderRadius: 10,
        },
        styles.container,
      ]}
    >
      <Avatar text={avatarText} size="sm" />
      <View>
        <Text style={styles.fullName}>{name}</Text>
        <Text style={styles.website}>{website}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  fullName: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    paddingBottom: 3,
  },
  website: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: "grey",
  },
});

export default UserItem;
