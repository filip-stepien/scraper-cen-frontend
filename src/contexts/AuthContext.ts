import { createContext, type Dispatch, type SetStateAction } from 'react';

type AuthContextProps = {
    authenticated: boolean;
    setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextProps>({
    authenticated: false,
    setAuthenticated: () => console.error('Not implemented.')
});
