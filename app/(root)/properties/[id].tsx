import { facilities } from '@/constants/data';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { getPropertyById } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    ImageSourcePropType,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const InfoItem = ({
    icon,
    number,
    text,
}: {
    icon: ImageSourcePropType;
    number: string;
    text: string;
}) => (
    <View className="flex flex-row gap-2 items-center">
        <View className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
            <Image source={icon} className="size-4" />
        </View>
        <Text className="font-rubik-medium text-sm text-black-300">
            {number} {text}
        </Text>
    </View>
);

const PropertyDetails = () => {
    const { id } = useLocalSearchParams();

    const windowHeight = Dimensions.get('window').height;

    const { data: property } = useAppwrite({
        fn: getPropertyById,
        params: { id: id as string },
    });

    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 bg-white"
            >
                <View
                    className="relative w-full"
                    style={{ height: windowHeight / 2 }}
                >
                    <Image
                        source={{ uri: property?.image }}
                        className="size-full"
                        resizeMode="cover"
                    />
                    <Image
                        source={images.whiteGradient}
                        className="absolute top-0 w-full z-40"
                    />
                    <View
                        className="z-50 absolute inset-x-7"
                        style={{ top: Platform.OS === 'ios' ? 70 : 20 }}
                    >
                        <View className="flex flex-row justify-between items-center w-full">
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                            >
                                <Image
                                    source={icons.backArrow}
                                    className="size-5"
                                />
                            </TouchableOpacity>
                            <View className="flex flex-row items-center gap-3">
                                <Image
                                    source={icons.heart}
                                    className="size-7"
                                    tintColor={'#191D31'}
                                />
                                <Image source={icons.send} className="size-7" />
                            </View>
                        </View>
                    </View>
                </View>
                <View className="px-5">
                    <View className="mt-5 flex flex-col">
                        <Text className="font-rubik-bold text-2xl text-black-300">
                            {property?.name}
                        </Text>
                        <View className="flex flex-row items-center gap-3 mt-5">
                            <View className="flex flex-row items-center justify-center py-1 px-4 bg-primary-100 border border-primary-200 rounded-full">
                                <Text className="font-rubik-semibold text-primary-300 text-sm">
                                    {property?.type}
                                </Text>
                            </View>
                            <View className="flex flex-row items-center gap-1">
                                <Image className="size-5" source={icons.star} />
                                <Text className="font-rubik-medium text-sm text-black-200">
                                    {property?.rating} (
                                    {property?.reviews.length} reviews)
                                </Text>
                            </View>
                        </View>
                        <View className="flex flex-row items-center justify-between mt-5">
                            <InfoItem
                                icon={icons.bed}
                                number={property?.bedrooms}
                                text="beds"
                            />
                            <InfoItem
                                icon={icons.bath}
                                number={property?.bathrooms}
                                text="baths"
                            />
                            <InfoItem
                                icon={icons.area}
                                number={property?.area}
                                text="sqft"
                            />
                        </View>
                        <View className="border-t border-primary-200 pt-7 mt-5">
                            <Text className="font-rubik-semibold text-xl text-black-300">
                                Agent
                            </Text>
                            <View className="flex flex-row items-center justify-between mt-4">
                                <View className="flex flex-row items-center gap-3">
                                    <Image
                                        source={{ uri: property?.agent.avatar }}
                                        className="size-16 rounded-full"
                                    />
                                    <View className="fles fles-col">
                                        <Text className="font-rubik-semibold text-lg text-black-300">
                                            {property?.agent.name}
                                        </Text>
                                        <Text className="font-rubik-semibold text-sm text-black-200">
                                            {property?.agent.email}
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex flex-row gap-3">
                                    <Image
                                        source={icons.chat}
                                        className="size-7"
                                    />
                                    <Image
                                        source={icons.phone}
                                        className="size-7"
                                    />
                                </View>
                            </View>
                        </View>
                        <View className="mt-5">
                            <Text className="font-rubik-semibold text-xl text-black-300">
                                Overview
                            </Text>
                            <Text className="text-base font-rubik text-black-200 mt-3">
                                {property?.description}
                            </Text>
                        </View>
                        <View className="mt-5">
                            <Text className="font-rubik-semibold text-xl text-black-300">
                                Facilities
                            </Text>
                            {property?.facilities.length > 0 && (
                                <View className="flex flex-row flex-wrap items-start justify-start mt-2 gap-5">
                                    {property?.facilities.map(
                                        (item: string, index: number) => {
                                            const facility = facilities.find(
                                                (facility) =>
                                                    facility.title === item
                                            );

                                            return (
                                                <View
                                                    key={index}
                                                    className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                                                >
                                                    <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                                                        <Image
                                                            source={
                                                                facility
                                                                    ? facility.icon
                                                                    : icons.info
                                                            }
                                                            className="size-6"
                                                        />
                                                    </View>

                                                    <Text
                                                        numberOfLines={1}
                                                        ellipsizeMode="tail"
                                                        className="text-black-300 text-sm text-center font-rubik mt-1.5"
                                                    >
                                                        {item}
                                                    </Text>
                                                </View>
                                            );
                                        }
                                    )}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default PropertyDetails;
