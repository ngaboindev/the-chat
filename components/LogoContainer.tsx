import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { View } from "react-native";

const LogoContainer = () => {
  return (
    <View>
      <Entypo name="chat" size={100} color={Colors.primary} />
    </View>
  );
};

export default LogoContainer;
