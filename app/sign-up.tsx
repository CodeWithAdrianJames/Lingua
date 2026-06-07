import { useRouter } from "expo-router";
import { Image, Pressable, Text, TextInput, View, ScrollView } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import VerificationModal from "../components/VerificationModal";

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");

  const handleSignUp = () => {
    if (email.trim() && password.trim()) {
      // Show verification modal
      setVerificationEmail(email);
      setShowVerificationModal(true);
    }
  };

  const handleSocialAuth = (provider: string) => {
    console.log("Authenticating with", provider);
    // TODO: Implement social auth with Clerk
    // For now, show verification modal
    const socialEmail = `user@${provider}.com`;
    setVerificationEmail(socialEmail);
    setShowVerificationModal(true);
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button */}
        <View className="flex-row items-center px-6 pt-6 pb-6">
          <Pressable onPress={() => router.back()} className="p-2">
            <Text className="text-3xl text-lingua-text-primary">‹</Text>
          </Pressable>
        </View>

        {/* Title and subtitle */}
        <View className="px-6 mb-6">
          <Text className="text-h1 text-lingua-text-primary font-poppins-bold mb-2">
            Create your account
          </Text>
          <Text className="text-body-lg text-lingua-text-secondary font-poppins-regular">
            Start your language journey today ✨
          </Text>
        </View>

        {/* Mascot illustration with sparkles */}
        <View className="items-center relative h-48 mb-4">
          {/* Decorative sparkles */}
          <View className="absolute top-8 left-8">
            <Text className="text-2xl">✨</Text>
          </View>
          <View className="absolute top-16 right-12">
            <Text className="text-xl">✨</Text>
          </View>
          <View className="absolute bottom-8 right-16">
            <Text className="text-lg">✨</Text>
          </View>

          {/* Mascot image */}
          <Image
            source={require("../assets/images/mascot-welcome.png")}
            className="w-48 h-48"
            resizeMode="contain"
          />
        </View>

        {/* Email input */}
        <View className="px-6 mb-4">
          <View className="bg-white rounded-2xl border border-lingua-border overflow-hidden">
            <View className="px-5 py-3">
              <Text className="text-body-sm text-lingua-text-secondary font-poppins-medium mb-1">
                Email
              </Text>
              <TextInput
                placeholder="alex@gmail.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor="#ADB5BD"
                className="text-body-lg text-lingua-text-primary font-poppins-regular"
              />
            </View>
          </View>
        </View>

        {/* Password input */}
        <View className="px-6 mb-8">
          <View className="bg-white rounded-2xl border border-lingua-border overflow-hidden">
            <View className="px-5 py-3 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-body-sm text-lingua-text-secondary font-poppins-medium mb-1">
                  Password
                </Text>
                <TextInput
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#ADB5BD"
                  className="text-body-lg text-lingua-text-primary font-poppins-regular"
                />
              </View>
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                className="p-2"
              >
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#6B7280"
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Sign Up button */}
        <View className="px-6 mb-6">
          <Pressable
            onPress={handleSignUp}
            className="bg-lingua-purple rounded-2xl py-4 flex-row items-center justify-center gap-2"
            style={{
              opacity: email.trim() && password.trim() ? 1 : 0.5,
            }}
            disabled={!email.trim() || !password.trim()}
          >
            <Text className="text-white text-h3 font-poppins-bold">Sign Up</Text>
          </Pressable>
        </View>

        {/* Divider with text */}
        <View className="flex-row items-center px-6 mb-6">
          <View className="flex-1 h-px bg-lingua-border" />
          <Text className="mx-3 text-lingua-text-secondary text-body-md font-poppins-regular">
            or continue with
          </Text>
          <View className="flex-1 h-px bg-lingua-border" />
        </View>

        {/* Social auth buttons */}
        <View className="px-6 gap-3 mb-6">
          {/* Google */}
          <Pressable
            onPress={() => handleSocialAuth("google")}
            className="flex-row items-center gap-4 bg-white border border-lingua-border rounded-xl px-4 py-3"
          >
            <Text className="text-2xl">G</Text>
            <Text className="text-body-lg text-lingua-text-primary font-poppins-medium">
              Continue with Google
            </Text>
          </Pressable>

          {/* Facebook */}
          <Pressable
            onPress={() => handleSocialAuth("facebook")}
            className="flex-row items-center gap-4 bg-white border border-lingua-border rounded-xl px-4 py-3"
          >
            <View className="w-6 h-6 bg-blue-600 rounded items-center justify-center">
              <Text className="text-white text-sm font-poppins-bold">f</Text>
            </View>
            <Text className="text-body-lg text-lingua-text-primary font-poppins-medium">
              Continue with Facebook
            </Text>
          </Pressable>

          {/* Apple */}
          <Pressable
            onPress={() => handleSocialAuth("apple")}
            className="flex-row items-center gap-4 bg-white border border-lingua-border rounded-xl px-4 py-3"
          >
            <Text className="text-xl">🍎</Text>
            <Text className="text-body-lg text-lingua-text-primary font-poppins-medium">
              Continue with Apple
            </Text>
          </Pressable>
        </View>

        {/* Log in link */}
        <View className="flex-row items-center justify-center gap-1">
          <Text className="text-body-md text-lingua-text-secondary font-poppins-regular">
            Already have an account?
          </Text>
          <Pressable onPress={handleSignIn}>
            <Text className="text-body-md text-lingua-purple font-poppins-bold">
              Log in
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Verification Modal */}
      <VerificationModal
        visible={showVerificationModal}
        email={verificationEmail}
        onClose={() => setShowVerificationModal(false)}
      />
    </View>
  );
}
