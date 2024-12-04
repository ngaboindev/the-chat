import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";

export default function TabsLayout() {
  const { user } = useAuthStore();
  if (!user) {
    return <Redirect href="/(auth)/signin" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Chats",
          tabBarShowLabel: false,
          headerTitleStyle: {
            display: "none",
          },
          headerStyle: {
            backgroundColor: "transparent",
          },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          headerRight: () => (
            <Link href={"/chat/new"} asChild>
              <Pressable hitSlop={20} style={{ paddingHorizontal: 15 }}>
                <AntDesign name="pluscircle" size={26} color={Colors.primary} />
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
