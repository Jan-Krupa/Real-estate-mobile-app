import images from '@/constants/images';
import React from 'react';
import { Image, Text, View } from 'react-native';

const NoResults = () => {
    return (
        <View className="flex items-center my-5">
            <Image
                source={images.noResult}
                className="w-11/12 h-80"
                resizeMode="contain"
            />
            <Text className="text-2xl text-black-300 font-rubik-bold mt-2">
                No results
            </Text>
            <Text className="text-base text-black-100 mt-2">
                We could not find any results
            </Text>
        </View>
    );
};

export default NoResults;
