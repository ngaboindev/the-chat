import Avatar from "@/components/Avatar";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Styles } from "@/constants/Styles";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const ProfileScreen = () => {
  const { signOut, user, session } = useAuthStore();
  const [fullName, setFullName] = useState("");
  const [userWebsite, setUserWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const avatarText = fullName
    ? `${fullName.split(" ")[0]?.[0] ?? ""}${fullName.split(" ")[1]?.[0] ?? ""}`
    : "";

  useEffect(() => {
    if (session) getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const getProfile = async () => {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      console.log("Fetching profile for user ID:", user?.id);

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, website")
        .eq("id", user?.id)
        .single();

      console.log("Supabase response:", { data, error });

      if (error) {
        throw error;
      }

      if (data) {
        setFullName(data.full_name);
        setUserWebsite(data.website);
      } else {
        console.log("No data found for user ID:", user?.id);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  const updateProfile = async () => {
    if (!fullName) {
      return Alert.alert("Error", "Full name is required");
    }

    try {
      setIsLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      console.log("Updating profile for user ID:", user?.id);

      const res = await supabase.from("profiles").upsert({
        id: user?.id,
        full_name: fullName,
        website: userWebsite,
        updated_at: new Date(),
      });

      console.log("Supabase response:", res);

      if (res.error) {
        throw res.error;
      }

      if (res.status === 201 || res.status === 200) {
        Alert.alert("Success", "Profile updated successfully");
      } else {
        console.log("No data returned after update for user ID:", user?.id);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar text={avatarText} size="lg" />
      <View style={Styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={Styles.input}
        />
      </View>
      <View style={Styles.inputContainer}>
        <TextInput
          placeholder="Website"
          value={userWebsite}
          onChangeText={(text) => setUserWebsite(text)}
          style={Styles.input}
        />
      </View>
      <View style={{ marginVertical: 13, marginBottom: 40, width: "100%" }}>
        <Pressable onPress={updateProfile} style={Styles.button}>
          <Text style={Styles.buttonText}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Text>
        </Pressable>
      </View>
      <View style={{ width: "100%" }}>
        <Pressable
          onPress={signOut}
          style={[Styles.button, { backgroundColor: "red" }]}
        >
          <Text style={Styles.buttonText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#F2F2F2",
    color: "black",
    fontFamily: Fonts.medium,
    fontSize: 16,
    borderWidth: 1,
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: "100%",
  },
  buttonText: {
    fontFamily: Fonts.semiBold,
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default ProfileScreen;
