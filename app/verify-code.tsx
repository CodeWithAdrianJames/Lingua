import { useRouter, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { email, type } = useLocalSearchParams<{
    email: string;
    type: "signup" | "signin";
  }>();

  const [code, setCode] = useState("");

  // Auto-navigate to home when 6 digits are entered
  useEffect(() => {
    if (code.length === 6) {
      // Simulate verification delay
      const timer = setTimeout(() => {
        router.replace("/");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [code, router]);

  const handleKeyPress = (digit: string) => {
    if (code.length < 6) {
      setCode(code + digit);
    }
  };

  const handleBackspace = () => {
    if (code.length > 0) {
      setCode(code.slice(0, -1));
    }
  };

  const numberPadButtons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0"],
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-between px-6 py-8">
        {/* Header info */}
        <View>
          <Text className="text-h2 text-lingua-text-primary font-poppins-bold mb-2">
            Verify your email
          </Text>
          <Text className="text-body-lg text-lingua-text-secondary font-poppins-regular mb-1">
            We sent a verification code to
          </Text>
          <Text className="text-body-lg text-lingua-text-primary font-poppins-medium">
            {email}
          </Text>
        </View>

        {/* Code display */}
        <View className="items-center gap-4">
          <View className="flex-row gap-2 justify-center">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <View
                key={index}
                className="w-12 h-14 rounded-xl border-2 border-lingua-border items-center justify-center"
                style={{
                  borderColor:
                    index < code.length
                      ? "#6C4EF5"
                      : "#E5E7EB",
                }}
              >
                {code[index] && (
                  <Text className="text-h2 text-lingua-text-primary font-poppins-bold">
                    {code[index]}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Number pad */}
        <View className="gap-3">
          {numberPadButtons.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row gap-3 justify-center">
              {row.map((digit) => (
                <Pressable
                  key={digit}
                  onPress={() => handleKeyPress(digit)}
                  className="w-16 h-16 rounded-full bg-lingua-surface border border-lingua-border items-center justify-center active:bg-lingua-border"
                >
                  <Text className="text-h2 text-lingua-text-primary font-poppins-bold">
                    {digit}
                  </Text>
                </Pressable>
              ))}
              {rowIndex === numberPadButtons.length - 1 && (
                <Pressable
                  onPress={handleBackspace}
                  className="w-16 h-16 rounded-full bg-lingua-surface border border-lingua-border items-center justify-center active:bg-lingua-border"
                >
                  <Text className="text-h3 text-lingua-text-primary font-poppins-bold">
                    ⌫
                  </Text>
                </Pressable>
              )}
            </View>
          ))}
        </View>

        {/* Resend code */}
        <View className="flex-row items-center justify-center gap-1">
          <Text className="text-body-md text-lingua-text-secondary font-poppins-regular">
            Didn't receive the code?
          </Text>
          <Pressable>
            <Text className="text-body-md text-lingua-purple font-poppins-bold">
              Resend
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
