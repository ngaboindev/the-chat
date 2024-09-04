import LogoContainer from "@/components/LogoContainer";
import { Fonts } from "@/constants/Fonts";
import { Styles } from "@/constants/Styles";
import { Link } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <LogoContainer />
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View>
        <View style={Styles.inputContainer}>
          <TextInput style={Styles.input} placeholder="Full name" />
        </View>
        <View style={Styles.inputContainer}>
          <TextInput
            style={Styles.input}
            placeholder="Email"
            inputMode="email"
          />
        </View>
        <View style={Styles.inputContainer}>
          <TextInput
            style={Styles.input}
            secureTextEntry={true}
            placeholder="Password"
          />
        </View>

        <Pressable
          style={({ pressed }) => [Styles.button, pressed && { opacity: 0.5 }]}
        >
          <Text style={Styles.buttonText}>Sign Up</Text>
        </Pressable>
        <Link href={"/(auth)/signin"} asChild>
          <Text
            style={{
              paddingVertical: 30,
              fontSize: 16,
              fontFamily: Fonts.regular,
            }}
          >
            Login ?
          </Text>
        </Link>
      </View>
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
