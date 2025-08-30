import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Account, Avatars, Client, OAuthProvider } from 'react-native-appwrite';

export const config = {
    platform: 'com.realestateapp',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
    try {
        const redirectUrl = Linking.createURL('/');
        const response = await account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUrl
        );
        if (!response) throw new Error('Failed to login');

        const browserResult = await WebBrowser.openAuthSessionAsync(
            response.toString(),
            redirectUrl
        );

        if (browserResult.type !== 'success') throw new Error('Faild to login');

        const url = new URL(browserResult.url);

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if (!secret || !userId) throw new Error('Faild to login');

        const session = await account.createSession(userId, secret);

        if (!session) throw new Error('Faild to create a session');

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getUser() {
  try {
    const me = await account.get();
    if (!me?.$id) return null;

    const displayName = me.name?.trim() || me.email?.split('@')[0] || 'User';
    const avatarDataUrl = await getInitialsDataUrl(displayName, 128, 128);

    return {
      ...me,
      avatar: avatarDataUrl,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    const sub = bytes.subarray(i, i + chunk);
    binary += String.fromCharCode.apply(null, sub as unknown as number[]);
  }
  return btoa(binary);
}

export async function getInitialsDataUrl(name: string, width = 128, height = 128) {
  const safe = name?.trim() || 'User';
  const buf = await avatar.getInitials({ name: safe, width, height });
  const base64 = arrayBufferToBase64(buf);
  return `data:image/png;base64,${base64}`;
}
