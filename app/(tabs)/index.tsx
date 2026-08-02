import {supabase} from "@/lib/supabase";
import { Text, View} from 'react-native';
export default function HomeScreen() {
    supabase.from('saves').select('*').then(({data,error}) => {
        console.log("🔥 supabase data:", data);
        console.log("🔥 supabase error:", error);
    })
  return (
 <View>
   <Text className={'text-blue-500'}>Hello from revisit</Text>
 </View>
  );
}
