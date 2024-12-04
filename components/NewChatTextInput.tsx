import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  sentMessage: string;
  setSentMessage: (text: string) => void;
  handleSentMessageChange: (text: string) => void;
};

const NewChatTextInput = ({
  sentMessage,
  setSentMessage,
  handleSentMessageChange,
}: Props) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleOnSubmit = (message: string) => {
    handleSentMessageChange(message);
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[
          !isKeyboardVisible ? { justifyContent: "flex-end" } : { flex: 1 },
        ]}
      >
        <View style={styles.inputContainer}>
          <TextInput
            value={sentMessage}
            onChangeText={(text) => setSentMessage(text)}
            onSubmitEditing={(event) => handleOnSubmit(event.nativeEvent.text)}
            style={styles.chatInput}
            placeholder="New Chat"
            returnKeyType="send"
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: Colors.lightGrey,
    marginHorizontal: 20,
    borderRadius: 3,
    borderColor: "##9a9a9a",
    borderWidth: 1,
  },
  chatInput: {
    width: "100%",
    padding: 3,
    fontFamily: Fonts.regular,
    color: "#0D0D0D",
  },
});

export default NewChatTextInput;
