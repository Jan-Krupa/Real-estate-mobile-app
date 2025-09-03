import { Card, FeaturedCard } from '@/components/Cards';
import Filters from '@/components/Filters';
import NoResults from '@/components/NoResults';
import SearchBar from '@/components/SearchBar';
import icons from '@/constants/icons';
import { getLatestProperties, getProperties } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { useAppwrite } from '@/lib/useAppwrite';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    const { user } = useGlobalContext();
    const router = useRouter();
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();

    const { data: latestProperties, loading: latestPropertiesLoading } =
        useAppwrite({ fn: getLatestProperties });

    const {
        data: properties,
        loading: propertiesLoading,
        refetch,
    } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 6,
        },
        skip: true,
    });

    useEffect(() => {
        refetch({ filter: params.filter!, query: params.query!, limit: 6 });
    }, [params.filter, params.query]);

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);
    return (
        <SafeAreaView className="h-full bg-white">
            <FlatList
                data={properties}
                renderItem={({ item }) => (
                    <Card
                        item={item}
                        onPress={() => handleCardPress(item.$id)}
                    />
                )}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    propertiesLoading ? (
                        <ActivityIndicator className="text-primary-300 mt-5"></ActivityIndicator>
                    ) : (
                        <NoResults />
                    )
                }
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
                        {latestPropertiesLoading ? (
                            <ActivityIndicator
                                size="large"
                                className="text-primary-300"
                            />
                        ) : !latestProperties ||
                          latestProperties.length === 0 ? (
                            <NoResults />
                        ) : (
                            <FlatList
                                data={latestProperties}
                                renderItem={({ item }) => (
                                    <FeaturedCard
                                        item={item}
                                        onPress={() =>
                                            handleCardPress(item.$id)
                                        }
                                    />
                                )}
                                keyExtractor={(item) => item.$id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerClassName="flex gap-5 mt-5"
                            />
                        )}
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
