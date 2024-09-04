import AuthForm from "@/components/AuthForm";
import LogoContainer from "@/components/LogoContainer";
import { Fonts } from "@/constants/Fonts";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <LogoContainer />
        <Text style={styles.title}>Welcome To TheChat</Text>
      </View>
      <AuthForm type="signup" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.semiBold,
    paddingVertical: 20,
  },
});

export default SignUpScreen;
