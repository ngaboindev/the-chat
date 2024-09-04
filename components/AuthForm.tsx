import { Fonts } from "@/constants/Fonts";
import { Styles } from "@/constants/Styles";
import { supabase } from "@/lib/supabase";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  type: "signup" | "signin";
};

const AuthForm = ({ type }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signUpHandler = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please fill all fields");
    }

    setIsLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Error", error.message);
    }

    if (!session)
      Alert.alert("Please check your inbox for email verification!");

    setIsLoading(true);
  };

  const signInHandler = async () => {
    setIsLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (!error && data) {
      return router.replace("/(tabs)/");
    }

    if (error) Alert.alert(error.message);
    setIsLoading(false);
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
          {isLoading ? "Loading..." : type === "signup" ? "Register" : "Login"}
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
