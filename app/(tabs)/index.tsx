import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>hello world</Text>
      <StatusBar style="dark" />
    </View>
  );
}