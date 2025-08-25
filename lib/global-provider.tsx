import { createContext, useContext, type ReactNode } from 'react';
import { getUser } from './appwrite';
import { useAppwrite } from './useAppwrite';

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLogged: boolean;
    user: User | null;
    loading: boolean;
    refetch: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, loading, refetch } = useAppwrite({ fn: getUser });

    const isLogged = !!user;

    console.log(JSON.stringify(user, null, 2));

    return (
        <GlobalContext.Provider value={{ isLogged, user, loading, refetch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);

    if (!context)
        throw new Error('useGlobalContext must used within a GlobalProvider');

    return context;
};

export default GlobalProvider;
