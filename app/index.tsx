import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-h2 mt-120 text-center text-lingua-purple mb-8">
        Lingua
      </Text>
      <Pressable
        onPress={() => router.push("/onboarding")}
        className="bg-lingua-purple px-6 py-3 rounded-full"
      >
        <Text className="text-white font-poppins-semibold">View Onboarding</Text>
      </Pressable>
    </View>
  );
}
