import {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, TextInput} from "react-native";
import {Pressable} from "react-native";
import {useRouter} from "expo-router";
import {ActivityIndicator} from "react-native";
import {supabase} from "@/lib/supabase";
export default function SignIn(){
    const [email , setEmail] = useState("");
    const [otp , setOtp] = useState("");
    const [stage , setStage] = useState<"email" | "otp">("email");
    const [loading , setLoading] = useState(false);
    const router = useRouter();


    const sendOtp = async () => {
        setLoading(true);
        const {error} = await supabase.auth.signInWithOtp({email});
        setLoading(false);
        if(error){
            console.error(error);
            return;
        }

        setStage("otp");

    }

    const verifyOtp = async () => {
        setLoading(true);
        const {error} = await supabase.auth.verifyOtp({email, token: otp, type: "email"});
        setLoading(false);
        if(error){
            console.error(error);
            return;
        }

        router.replace("/(tabs)");
    }



    return (
        <SafeAreaView className={'flex-1 bg-white justify-center px-6'}>
         <Text className={"text-2xl font-black mb-6"}>
             {stage === "email" ? "Sign in to Revisit" : "Enter the code"}
         </Text>

            {
                stage === "email" ? (
                    <>
                    <TextInput className={'border border-neutral-200 rounded-xl px-4 py-3 mb-4'} placeholder="you@example.com" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail}/>
                        <Pressable
                            className="bg-black rounded-full py-3.5 items-center"
                            onPress={sendOtp}
                            disabled={loading || !email}
                        >
                            {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-semibold">Send code</Text>}
                        </Pressable>
                    </>

                ) : (


<>
    <TextInput
        className="border border-neutral-200 rounded-xl px-4 py-3 mb-4"
        placeholder="6-digit code"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
    />
    <Pressable
        className="bg-black rounded-full py-3.5 items-center"
        onPress={verifyOtp}
        disabled={loading || otp.length < 6}
    >
        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-semibold">Verify</Text>}
    </Pressable>
</>
                )
            }
        </SafeAreaView>
    )
}