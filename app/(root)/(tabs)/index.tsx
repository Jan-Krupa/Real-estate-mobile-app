import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-4xl font-rubik text-blue-500">
                My real estate app
            </Text>
            <Link href="/sign-in">Sign In</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/properties/1">Property</Link>
        </View>
    );
}
