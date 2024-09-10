import UserWrapper from "@/components/UserWrapper";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { HeaderBackButton } from "@react-navigation/elements";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
} from "react-native-gifted-chat";

const CustomBubble = (props: BubbleProps<IMessage>) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          fontFamily: Fonts.regular,
        },
        left: {
          fontFamily: Fonts.regular,
        },
      }}
      wrapperStyle={{
        right: {
          backgroundColor: Colors.primary,
        },
      }}
    />
  );
};

const ChatScreen = () => {
  const { user: authUser } = useAuthStore();
  const [user, setUser] = useState<any>(null);
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const receiverId = params.chatId;
  const senderId = authUser?.id;

  const navigation = useNavigation();

  const fetchMessage = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("sender_id", authUser?.id)
      .eq("receiver_id", receiverId)
      .order("created_at", { ascending: false });
    console.log(data);
    if (!error) {
      const formattedMessages = data.map((msg) => ({
        _id: msg.id,
        text: msg.content,
        createdAt: new Date(msg.created_at),
        user: {
          _id: msg.sender_id,
          name: user?.fullname || "User",
        },
      }));
      setMessages(formattedMessages);
    }
  };

  const getSingleProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", receiverId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setUser(data);
        fetchMessage();
      } else {
        console.log("No data found for user ID:", receiverId);
      }
    } catch (error) {
      console.log("error getting users", error);
    }
  };

  useEffect(() => {
    getSingleProfile();
  }, []);

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
          <UserWrapper name={user?.full_name || ""} />
        </View>
      ),
    });
  }, [navigation, user]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
        received: true,
      },
    ]);
  }, []);

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    const newMessage = newMessages[0];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages),
    );

    const { data, error } = await supabase.from("messages").insert([
      {
        sender_id: senderId,
        receiver_id: receiverId,
        content: newMessage?.text,
      },
    ]);

    if (error) {
      console.error("Error sending message:", error);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View></View>
      <GiftedChat
        renderBubble={CustomBubble}
        messages={messages}
        onSend={(messages: never[]) => onSend(messages)}
        user={{
          _id: 1,
        }}
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
