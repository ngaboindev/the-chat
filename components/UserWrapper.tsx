import { Fonts } from "@/constants/Fonts";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  name?: string;
};

const UserWrapper = ({ name = "Me" }: Props) => {
  return (
    <View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 19,
    fontFamily: Fonts.semiBold,
  },
});

export default UserWrapper;
