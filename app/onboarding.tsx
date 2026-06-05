import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 py-8">
      {/* Centered header with logo and app name */}
      <View className="flex-row items-center justify-center gap-2 mb-12 mt-8">
        <Image
          source={require("../assets/images/moscot-logo.png")}
          className="w-8 h-8"
        />
        <Text className="text-h3 text-lingua-text-primary font-poppins-bold">
          lingua
        </Text>
      </View>

      {/* Main content - scrollable area */}
      <View className="flex-1 flex-col justify-between">
        {/* Title and description section */}
        <View>
          {/* Title with "teacher." in purple */}
          <View className="mb-6">
            <Text className="text-h1 text-lingua-text-primary">
              Your AI language
            </Text>
            <Text className="text-h1 text-lingua-purple">teacher.</Text>
          </View>

          {/* Subtitle */}
          <Text className="text-body-lg text-lingua-text-secondary">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Mascot and speech bubbles section */}
        <View className="items-center my-12">
          {/* Speech bubbles */}
          <View className="absolute top-0 left-0 right-0 flex-row justify-between px-6 mb-4">
            {/* Hello bubble - left */}
            <View className="bg-blue-100 rounded-3xl px-4 py-2 max-w-24">
              <Text className="text-sm font-poppins-medium text-lingua-text-primary">
                Hello!
              </Text>
            </View>

            {/* iHola bubble - right */}
            <View className="bg-purple-200 rounded-3xl px-4 py-2 max-w-24">
              <Text className="text-sm font-poppins-medium text-lingua-purple">
                ¡Hola!
              </Text>
            </View>
          </View>

          {/* Mascot image */}
          <Image
            source={require("../assets/images/mascot-welcome.png")}
            className="w-96 h-96"
            resizeMode="contain"
          />

          {/* Chinese greeting bubble - bottom right */}
          <View className="absolute bottom-0 right-6 bg-red-100 rounded-3xl px-4 py-2">
            <Text className="text-sm font-poppins-medium text-red-500">你好!</Text>
          </View>
        </View>
      </View>

      {/* Get Started button */}
      <Pressable
        onPress={() => router.push("/")}
        className="bg-lingua-purple rounded-full py-4 flex-row items-center justify-center gap-2 mb-8"
      >
        <Text className="text-white text-h3 font-poppins-bold">Get Started</Text>
        <Text className="text-white text-2xl">›</Text>
      </Pressable>
    </View>
  );
}
