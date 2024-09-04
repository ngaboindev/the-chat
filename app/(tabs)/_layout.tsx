import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Session } from "@supabase/supabase-js";
import { Link, Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";

export default function TabsLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);

  if (!session) {
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
