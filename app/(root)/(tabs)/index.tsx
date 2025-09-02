import { Card, FeaturedCard } from '@/components/Cards';
import Filters from '@/components/Filters';
import SearchBar from '@/components/SearchBar';
import icons from '@/constants/icons';
import { useGlobalContext } from '@/lib/global-provider';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    const { user } = useGlobalContext();
    const router = useRouter();

    return (
        <SafeAreaView className="h-full bg-white">
            <FlatList
                data={[1, 2, 3, 4]}
                renderItem={({ item }) => <Card />}
                keyExtractor={(item) => item.toString()}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View className="px-5">
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
                        <SearchBar />
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
                        </View>
                        <FlatList
                            data={[1, 2, 3]}
                            renderItem={({ item }) => <FeaturedCard />}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.toString()}
                            bounces={false}
                            contentContainerClassName="flex gap-5"
                        />
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
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
