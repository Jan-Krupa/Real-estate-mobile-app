import { settings } from '@/constants/data';
import icons from '@/constants/icons';
import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import React from 'react';
import {
    Alert,
    Image,
    ImageSourcePropType,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
    const { user, refetch } = useGlobalContext();

    const handleLogout = async () => {
        const result = await logout();
        if (result) {
            Alert.alert('Success', 'Logged out successfully');
            refetch();
        } else {
            Alert.alert('Error', 'Failed to logout');
        }
    };

    interface SettingsItemProp {
        icon: ImageSourcePropType;
        title: string;
        onPress?: () => void;
        textStyle?: string;
        showArrow?: boolean;
    }

    const SettingItems = ({
        icon,
        title,
        onPress,
        textStyle,
        showArrow = true,
    }: SettingsItemProp) => (
        <TouchableOpacity
            onPress={onPress}
            className="flex flex-row items-center justify-between py-3"
        >
            <View className="flex flex-row items-center gap-3">
                <Image className="size-7" source={icon} />
                <Text
                    className={`font-rubik-medium text-lg text-black-300 ${textStyle}`}
                >
                    {title}
                </Text>
            </View>
            {showArrow && (
                <Image source={icons.rightArrow} className="size-5" />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >
                <View className="flex flex-row justify-between text-xl items-center mt-5">
                    <Text className="text-xl color-black-300 font-rubik-semibold">
                        Profile
                    </Text>
                    <Image className="size-5" source={icons.bell} />
                </View>
                <View className="flex flex-row justify-center mt-5">
                    <View className="flex flex-col items-center relative mt-5">
                        <Image
                            source={{ uri: user?.avatar }}
                            className="size-44 relative rounded-full"
                        />
                        <TouchableOpacity className="absolute bottom-11 right-2">
                            <Image source={icons.edit} className="size-9" />
                        </TouchableOpacity>

                        <Text className="text-2xl font-rubik-bold mt-2">
                            {user?.name}
                        </Text>
                    </View>
                </View>
                <View className="flex flex-col mt-10">
                    <SettingItems icon={icons.calendar} title="My booking" />
                    <SettingItems icon={icons.wallet} title="Payments" />
                </View>
                <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
                    {settings.slice(2).map((item, index) => (
                        <SettingItems
                            key={index}
                            icon={item.icon}
                            title={item.title}
                        />
                    ))}
                </View>
                <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
                    <SettingItems
                        icon={icons.logout}
                        title="Logout"
                        textStyle="text-danger"
                        onPress={handleLogout}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
