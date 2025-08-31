import { Card, FeaturedCard } from '@/components/Cards';
import Filters from '@/components/Filters';
import icons from '@/constants/icons';
import { useGlobalContext } from '@/lib/global-provider';
import { useRouter } from 'expo-router';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    const { user } = useGlobalContext();
    const router = useRouter();

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >
                <View className="flex flex-row justify-between mt-5 items-center">
                    <TouchableOpacity
                        onPress={() => router.push('./profile')}
                        className="flex flex-row gap-3 items-center"
                    >
                        <Image
                            className="size-11 rounded-full"
                            source={{ uri: user?.avatar }}
                        />
                        <View>
                            <Text className="color-black-100 text-xs font-rubik">
                                Good Morning
                            </Text>
                            <Text className="color-black-300 font-rubik-medium text-lg">
                                {user?.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Image className="size-5" source={icons.bell} />
                </View>
                <View className="w-full h-[52px] bg-accent-100 rounded-md mt-5 flex flex-row items-center justify-between px-3">
                    <View className="flex flex-row items-center gap-3">
                        <Image className="size-5" source={icons.search} />
                        <TextInput
                            placeholder="Search something"
                            placeholderTextColor="#8C8E98"
                        />
                    </View>
                    <TouchableOpacity>
                        <Image className="size-5" source={icons.filter} />
                    </TouchableOpacity>
                </View>
                <View className="my-5">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="color-black-300 text-xl font-rubik-semibold">
                            Featured
                        </Text>
                        <TouchableOpacity className="flex flex-row justify-center items-center">
                            <Text className="color-primary-300 font-rubik-semibold text-base">
                                See All
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex flex-row gap-5 mt-5">
                        <FeaturedCard />
                        <FeaturedCard />
                    </View>
                </View>
                <View className="my-5">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="color-black-300 text-xl font-rubik-semibold">
                            Our Recommendation
                        </Text>
                        <TouchableOpacity className="flex flex-row justify-center items-center">
                            <Text className="color-primary-300 font-rubik-semibold text-base">
                                See All
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Filters />
                    <View className="flex flex-row gap-5 mt-5">
                        <Card />
                        <Card />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
