import { AuthContext } from '../contexts/AuthContext';
import { useEffect, useState, type JSX } from 'react';
import { registerUnauthorizedHandler } from '../lib/axios';
import { checkAuth } from '@/lib/auth';

export function AuthContextProvider({ children }: { children: JSX.Element }) {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const setInitialAuthStatus = async () => {
            try {
                await checkAuth();
                setAuthenticated(true);
            } catch {
                setAuthenticated(false);
            }
        };

        registerUnauthorizedHandler(() => setAuthenticated(false));
        setInitialAuthStatus();
    }, []);

    return (
        <AuthContext value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthContext>
    );
}
