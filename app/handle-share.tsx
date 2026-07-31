import {View,Text} from 'react-native';
import {useShareIntent} from "expo-share-intent";

export default function HandleShare(){
    const {hasShareIntent, shareIntent,resetShareIntent} = useShareIntent();
    return (
        <View className={'flex-1 items-center justify-center padding-20'}>
            <Text>Shared URL: </Text>
            <Text selectable className={'top-10'}>
                {shareIntent?.webUrl ?? "No URL received"}
            </Text>
        </View>
    )
}