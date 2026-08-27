import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Pressable, ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/colors";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [stage, setStage] = useState<"email" | "otp">("email");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const sendOtp = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({ email });
        setLoading(false);
        if (error) {
            console.error(error);
            return;
        }
        setStage("otp");
    };

    const verifyOtp = async () => {
        setLoading(true);
        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: "email",
        });
        setLoading(false);
        if (error) {
            console.error(error);
            return;
        }
        router.replace("/(tabs)");
    };

    return (
        <SafeAreaView className="flex-1 bg-background justify-center px-6">
            {/* Branding hint */}
            <View className="mb-8">
                <Text className="font-display text-display text-primary">
                    {stage === "email" ? "Sign in to Revisit" : "Enter the code"}
                </Text>
                <Text className="font-body text-body text-secondary mt-2">
                    {stage === "email"
                        ? "We'll send a magic code to your email."
                        : "Check your inbox for a 6-digit code."}
                </Text>
            </View>

            {stage === "email" ? (
                <>
                    <TextInput
                        className="border border-border bg-surface rounded-card px-4 py-3.5 mb-4 font-body text-body text-primary"
                        placeholder="you@example.com"
                        placeholderTextColor={Colors.textMuted}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Pressable
                        className="bg-primary rounded-pill py-3.5 items-center"
                        onPress={sendOtp}
                        disabled={loading || !email}
                        style={{ opacity: loading || !email ? 0.6 : 1 }}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.surface} />
                        ) : (
                            <Text className="font-semibold text-body text-surface">
                                Send code
                            </Text>
                        )}
                    </Pressable>
                </>
            ) : (
                <>
                    <TextInput
                        className="border border-border bg-surface rounded-card px-4 py-3.5 mb-4 font-body text-body text-primary"
                        placeholder="6-digit code"
                        placeholderTextColor={Colors.textMuted}
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={setOtp}
                    />
                    <Pressable
                        className="bg-primary rounded-pill py-3.5 items-center"
                        onPress={verifyOtp}
                        disabled={loading || otp.length < 6}
                        style={{ opacity: loading || otp.length < 6 ? 0.6 : 1 }}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.surface} />
                        ) : (
                            <Text className="font-semibold text-body text-surface">
                                Verify
                            </Text>
                        )}
                    </Pressable>
                </>
            )}
        </SafeAreaView>
    );
}
