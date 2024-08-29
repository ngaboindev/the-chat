import UserWrapper from "@/components/UserWrapper";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const ChatScreen = () => {
  // const params = useLocalSearchParams();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {navigation.canGoBack() && (
            <HeaderBackButton
              onPress={() => navigation.goBack()}
              labelVisible={false}
            />
          )}
          <UserWrapper />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatsContainer}>
        <View style={styles.chatMessageContainer}>
          <Text style={styles.chatMessageText}>Chat Screen</Text>
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.chatInput}
          placeholder="New Chat"
          returnKeyType="send"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-end",
  },
  chatsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  chatMessageContainer: {
    // backgroundColor: "#F4F4F4",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  chatMessageText: {
    fontFamily: Fonts.regular,
    // color: "#0D0D0D",
    color: "#fff",
    fontSize: 14,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "#F4F4F4",
    marginHorizontal: 20,
  },
  chatInput: {
    width: "100%",
    padding: 3,
    fontFamily: Fonts.medium,
    color: "#0D0D0D",
  },
});

export default ChatScreen;
