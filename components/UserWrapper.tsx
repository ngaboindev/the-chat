import { Fonts } from "@/constants/Fonts";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  status?: string;
};

const UserWrapper = ({ status }: Props) => {
  return (
    <View>
      <Text style={styles.name}>Robert Ngabo</Text>
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
