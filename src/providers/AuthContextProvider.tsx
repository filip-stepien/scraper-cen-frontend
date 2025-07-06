import { AuthContext } from '../contexts/AuthContext';
import { useEffect, useState, type JSX } from 'react';
import { registerUnauthorizedHandler } from '../lib/axios';

export function AuthContextProvider({ children }: { children: JSX.Element }) {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        registerUnauthorizedHandler(() => setAuthenticated(false));
    }, []);

    return (
        <AuthContext value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthContext>
    );
}
