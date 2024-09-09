import UserWrapper from "@/components/UserWrapper";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { supabase } from "@/lib/supabase";
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
  const [user, setUser] = useState<any>(null);
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const navigation = useNavigation();

  const getSingleProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", params.chatId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setUser(data);
      } else {
        console.log("No data found for user ID:", params.chatId);
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

  const getMessages = async () => {
    try {
      await supabase
        .from("messages")
        .select("*")
        .eq("user_id", params.chatId)
        .order("createdAt", { ascending: true });
    } catch (error) {
      console.log(error);
    }
  };

  const saveMessage = async (message: IMessage) => {
    try {
      const { data, error } = await supabase.from("messages").insert([
        {
          message: message.text,
          user_id: params.chatId,
          createdAt: message.createdAt,
          text: message.text,
          user: {
            _id: params.chatId,
            name: user?.full_name,
          },
        },
      ]);

      if (error) {
        throw error;
      }

      console.log("message saved", data);
    } catch (error) {
      console.log("error saving message", error);
    }
  };

  const onSend = useCallback((messages = []) => {
    saveMessage(messages[0]);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
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
