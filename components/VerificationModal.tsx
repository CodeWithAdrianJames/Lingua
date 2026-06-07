import { useRouter } from "expo-router";
import {
  Pressable,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";

interface VerificationModalProps {
  visible: boolean;
  email: string;
  onClose: () => void;
}

export default function VerificationModal({
  visible,
  email,
  onClose,
}: VerificationModalProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const screenWidth = Dimensions.get("window").width;
  const modalWidth = Math.min(screenWidth * 0.9, 500); // 40-50% of screen or max 500px

  // Auto-navigate to home when 6 digits are entered
  useEffect(() => {
    if (code.length === 6) {
      setIsVerifying(true);
      // Simulate verification delay
      const timer = setTimeout(() => {
        setIsVerifying(false);
        setCode("");
        onClose();
        router.replace("/");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [code, onClose, router]);

  // Reset error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Resend countdown timer
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleKeyPress = (digit: string) => {
    if (code.length < 6 && !isVerifying) {
      setCode(code + digit);
      setError("");
    }
  };

  const handleBackspace = () => {
    if (code.length > 0) {
      setCode(code.slice(0, -1));
    }
  };

  const handleResend = () => {
    if (resendCountdown === 0) {
      console.log("Resending verification code to", email);
      setResendCountdown(60); // 60 second countdown
      setError("");
    }
  };

  const numberPadButtons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0"],
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Dark overlay backdrop - fill entire screen */}
      <View className="flex-1 bg-black/70">
        <Pressable
          onPress={onClose}
          className="flex-1"
          activeOpacity={1}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-end"
            pointerEvents="box-none"
          >
            <Pressable
              onPress={(e) => e.stopPropagation()}
              activeOpacity={1}
              style={{ width: modalWidth, alignSelf: "center" }}
            >
              <ScrollView
                scrollEnabled={false}
                className="bg-white rounded-t-3xl overflow-hidden"
                contentContainerStyle={{ minHeight: "auto" }}
              >
                <View className="px-6 py-8">
                  {/* Header with close button */}
                  <View className="flex-row items-center justify-between mb-6">
                    <View />
                    <Pressable onPress={onClose} className="p-2">
                      <Text className="text-2xl text-lingua-text-primary">✕</Text>
                    </Pressable>
                  </View>

                  {/* Header info */}
                  <View className="mb-8">
                    <Text className="text-h3 text-lingua-text-primary font-poppins-bold mb-2">
                      Verify your email
                    </Text>
                    <Text className="text-body-md text-lingua-text-secondary font-poppins-regular mb-1">
                      We sent a verification code to
                    </Text>
                    <Text className="text-body-md text-lingua-text-primary font-poppins-medium">
                      {email}
                    </Text>
                  </View>

                  {/* Code display */}
                  <View className="items-center gap-4 mb-8">
                    <View className="flex-row gap-2 justify-center">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <View
                          key={index}
                          className="w-11 h-13 rounded-lg border-2 border-lingua-border items-center justify-center"
                          style={{
                            borderColor:
                              index < code.length ? "#6C4EF5" : "#E5E7EB",
                            backgroundColor:
                              index < code.length ? "#F0EBFF" : "#FFFFFF",
                          }}
                        >
                          {code[index] && (
                            <Text className="text-h3 text-lingua-text-primary font-poppins-bold">
                              {code[index]}
                            </Text>
                          )}
                        </View>
                      ))}
                    </View>

                    {/* Error message */}
                    {error && (
                      <Text className="text-body-sm text-lingua-error font-poppins-medium">
                        {error}
                      </Text>
                    )}

                    {/* Verifying indicator */}
                    {isVerifying && (
                      <Text className="text-body-sm text-lingua-purple font-poppins-medium">
                        Verifying...
                      </Text>
                    )}
                  </View>

                  {/* Number pad */}
                  <View className="gap-2 mb-8">
                    {numberPadButtons.map((row, rowIndex) => (
                      <View key={rowIndex} className="flex-row gap-2 justify-center">
                        {row.map((digit) => (
                          <Pressable
                            key={digit}
                            onPress={() => handleKeyPress(digit)}
                            disabled={isVerifying}
                            className="w-14 h-14 rounded-full bg-lingua-surface border border-lingua-border items-center justify-center active:bg-lingua-border"
                            style={{ opacity: isVerifying ? 0.5 : 1 }}
                          >
                            <Text className="text-h3 text-lingua-text-primary font-poppins-bold">
                              {digit}
                            </Text>
                          </Pressable>
                        ))}
                        {rowIndex === numberPadButtons.length - 1 && (
                          <Pressable
                            onPress={handleBackspace}
                            disabled={isVerifying}
                            className="w-14 h-14 rounded-full bg-lingua-surface border border-lingua-border items-center justify-center active:bg-lingua-border"
                            style={{ opacity: isVerifying ? 0.5 : 1 }}
                          >
                            <Text className="text-h4 text-lingua-text-primary font-poppins-bold">
                              ⌫
                            </Text>
                          </Pressable>
                        )}
                      </View>
                    ))}
                  </View>

                  {/* Resend code */}
                  <View className="flex-row items-center justify-center gap-1 pb-4">
                    <Text className="text-body-sm text-lingua-text-secondary font-poppins-regular">
                      Didn't receive the code?
                    </Text>
                    <Pressable
                      onPress={handleResend}
                      disabled={resendCountdown > 0}
                      style={{ opacity: resendCountdown > 0 ? 0.5 : 1 }}
                    >
                      <Text className="text-body-sm text-lingua-purple font-poppins-bold">
                        {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : "Resend"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </View>
    </Modal>
  );
}
