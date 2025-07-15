import { useState } from 'react';
import { useAuth } from './useAuth';
import { signOut } from '@/lib/auth';

export function useSignOut() {
    const { setAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        try {
            setLoading(true);
            await signOut();
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signOut: handleSignOut };
}
