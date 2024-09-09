import UserItem from "@/components/UserItem";
import { Fonts } from "@/constants/Fonts";
import { Styles } from "@/constants/Styles";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const NewChatScreen = () => {
  const [users, setUsers] = useState<null | any[]>(null);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { session } = useAuthStore();

  const handleNavigateUserToChat = (id: string) => {
    router.back();
    router.navigate(`/chat/${id}`);
  };

  useEffect(() => {
    if (session) getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const getUsers = async () => {
    try {
      if (!session) throw new Error("No session found!");
      const { data, error } = await supabase.from("profiles").select("*");
      setUsers(data);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log("error getting users", error);
    }
  };

  const filteredUsers = (users: any[], search: string) => {
    if (!search) return users;
    return users.filter((user) =>
      user.full_name.toLowerCase().includes(search.toLowerCase()),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>New chat</Text>
          </View>
          <Link href={"/(tabs)/"} asChild>
            <Pressable hitSlop={20}>
              <AntDesign name="closecircle" size={24} color="black" />
            </Pressable>
          </Link>
        </View>
        <View>
          <View style={Styles.inputContainer}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              style={Styles.input}
              placeholder="Search user"
            />
          </View>
        </View>
        {/* users list */}
        <FlatList
          data={filteredUsers(users || [], search)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UserItem
              name={item.full_name || "no name"}
              website={item.website || "no website"}
              onPress={() => handleNavigateUserToChat(item.id.toString())}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 40,
  },
  titleWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.semiBold,
  },
});

export default NewChatScreen;
