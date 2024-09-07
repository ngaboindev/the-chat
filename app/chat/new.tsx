import UserItem from "@/components/UserItem";
import { Fonts } from "@/constants/Fonts";
import { Styles } from "@/constants/Styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const usersList = [
  {
    id: 1,
    name: "John Doe",
    website: "johndoe.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    website: "janedoe.com",
  },
  {
    id: 3,
    name: "John Smith",
    website: "johnsmith.com",
  },
  {
    id: 4,
    name: "Jane Smith",
    website: "janesmith.com",
  },
];

const NewChatScreen = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleNavigateUserToChat = (id: string) => {
    router.back();
    router.navigate(`/chat/${id}`);
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
          data={usersList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UserItem
              name={item.name}
              website={item.website}
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
