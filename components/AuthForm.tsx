import { Fonts } from "@/constants/Fonts";
import { Styles } from "@/constants/Styles";
import { useAuthStore } from "@/store/authStore";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  type: "signup" | "signin";
};

const AuthForm = ({ type }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signUp, loading } = useAuthStore();

  const router = useRouter();

  const validateForm = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields!");
      return false;
    }
    return true;
  };

  const signUpHandler = async () => {
    if (!validateForm()) return;
    try {
      signUp(email, password);
      return router.replace("/(auth)/signin");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "An error occurred");
    }
  };

  const signInHandler = async () => {
    if (!validateForm()) return;
    try {
      signIn(email, password);
      return router.replace("/(tabs)/");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "An error occurred");
    }
  };

  const submitHandler = () => {
    if (type === "signup") {
      return signUpHandler();
    }
    return signInHandler();
  };

  return (
    <View>
      <View style={Styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={Styles.input}
          placeholder="Email"
          inputMode="email"
        />
      </View>
      <View style={Styles.inputContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={Styles.input}
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>

      <Pressable
        onPress={submitHandler}
        style={({ pressed }) => [Styles.button, pressed && { opacity: 0.5 }]}
      >
        <Text style={Styles.buttonText}>
          {loading ? "Loading..." : type === "signup" ? "Register" : "Login"}
        </Text>
      </Pressable>
      <Link
        href={type === "signup" ? "/(auth)/signin" : "/(auth)/signup"}
        asChild
      >
        <Text
          style={{
            paddingVertical: 30,
            fontSize: 16,
            fontFamily: Fonts.semiBold,
          }}
        >
          Redirect to {type === "signin" ? "Sign up" : "Sign in"} ?
        </Text>
      </Link>
    </View>
  );
};
export default AuthForm;
