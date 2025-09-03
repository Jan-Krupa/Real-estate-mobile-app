// import Filters from '@/components/Filters';
// import SearchBar from '@/components/SearchBar';
// import icons from '@/constants/icons';
// import images from '@/constants/images';
// import React from 'react';
// import { Image, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const Explore = () => {
//     return (
//         <SafeAreaView className="h-full bg-white">
//             <View className="px-5">
//                 <View className="flex flex-row justify-between items-center mt-5">
//                     <TouchableOpacity>
//                         <Image source={icons.backArrow} className="size-5" />
//                     </TouchableOpacity>
//                     <Text className="text-black-300 text-base font-rubik-medium">
//                         Search for Your Ideal Home
//                     </Text>
//                     <Image source={icons.bell} className="size-5" />
//                 </View>
//                 <SearchBar />
//                 <Filters />
//                 <View className="mt-5 flex- flex-col">
//                     <Text>Found x apartaments</Text>
//                     <View className="mt-5">
//                         <View className="p-5 flex flex-row justify-between items-center">
//                             <Image
//                                 source={images.newYork}
//                                 className="w-25 h-25 rounded-2xl"
//                             />
//                             <View className="flex flex-col">
//                                 <Text>Lucky Lake Apartaments</Text>
//                                 <Text>Beijing, China</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default Explore;

import { Card } from '@/components/Cards';
import Filters from '@/components/Filters';
import NoResults from '@/components/NoResults';
import SearchBar from '@/components/SearchBar';
import icons from '@/constants/icons';
import { getProperties } from '@/lib/appwrite';
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

export default function Explore() {
    const router = useRouter();
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();

    const {
        data: properties,
        loading: propertiesLoading,
        refetch,
    } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 20,
        },
        skip: true,
    });

    useEffect(() => {
        refetch({ filter: params.filter!, query: params.query!, limit: 20 });
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
                        <View className="flex flex-row justify-between items-center mt-5">
                            <TouchableOpacity onPress={() => router.back()}>
                                <Image
                                    source={icons.backArrow}
                                    className="size-5"
                                />
                            </TouchableOpacity>
                            <Text className="text-black-300 text-base font-rubik-medium">
                                Search for Your Ideal Home
                            </Text>
                            <Image source={icons.bell} className="size-5" />
                        </View>
                        <SearchBar />
                        <Filters />
                        <View className="mt-5">
                            <Text className="font-rubik-semibold text-xl text-black-300">
                                Found {properties?.length} apartaments
                            </Text>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
