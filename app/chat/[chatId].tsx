import NewChatTextInput from "@/components/NewChatTextInput";
import UserWrapper from "@/components/UserWrapper";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

let messages = [
  {
    id: 1,
    text: "Hello Robert, this is amazing i can message u using bluetooth",
    sent: true,
  },
  { id: 2, text: "Glad you like it! Let’s keep testing.", sent: false },
];

const ChatScreen = () => {
  const [sentMessage, setSentMessage] = useState<string>("");
  const [messagesList, setMessagesList] = useState<any[]>([]);

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

  useEffect(() => {
    setMessagesList(messages);
  }, []);

  const handleSentMessageChange = (text: string) => {
    setSentMessage(text);
    setMessagesList([
      ...messagesList,
      { id: messagesList.length + 1, text, sent: true },
    ]);
    setSentMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatsContainer}>
        {messagesList.map((message) => (
          <View
            key={message.id}
            style={[
              styles.chatMessageContainer,
              message.sent ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            <Text
              style={[
                styles.chatMessageText,
                message.sent
                  ? styles.sentMessageText
                  : styles.receivedMessageText,
              ]}
            >
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <NewChatTextInput
        setSentMessage={setSentMessage}
        sentMessage={sentMessage}
        handleSentMessageChange={handleSentMessageChange}
      />
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
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  sentMessage: {
    backgroundColor: Colors.primary,
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: Colors.lightGrey,
    alignSelf: "flex-start",
  },
  chatMessageContainer: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    width: "70%",
  },
  sentMessageText: {
    color: "#fff",
  },
  receivedMessageText: {
    color: "#0D0D0D",
  },
  chatMessageText: {
    fontFamily: Fonts.regular,

    fontSize: 14,
  },
});

export default ChatScreen;
