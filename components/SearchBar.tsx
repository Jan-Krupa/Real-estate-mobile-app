import icons from '@/constants/icons';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{ query?: string }>();
    const [search, setSearch] = useState(params.query);
    const debounceSearch = useDebouncedCallback(
        (text: string) => router.setParams({ query: text }),
        500
    );

    const handleSearch = (text: string) => {
        setSearch(text);
        debounceSearch(text);
    };

    return (
        <View className="w-full h-[52px] bg-accent-100 rounded-md mt-5 flex flex-row items-center justify-between px-3">
            <View className="flex flex-row items-center gap-3">
                <Image className="size-5" source={icons.search} />
                <TextInput
                    onChangeText={handleSearch}
                    value={search}
                    placeholder="Search something"
                    placeholderTextColor="#8C8E98"
                />
            </View>
            <TouchableOpacity>
                <Image className="size-5" source={icons.filter} />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;
