import { createContext, type Dispatch, type SetStateAction } from 'react';

type AuthContextProps = {
    authenticated: boolean | null;
    setAuthenticated: Dispatch<SetStateAction<boolean | null>>;
};

export const AuthContext = createContext<AuthContextProps>({
    authenticated: false,
    setAuthenticated: () => console.error('Not implemented.')
});
