import { signIn } from '@/lib/auth';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useAuth } from './useAuth';
import type { FormInstance } from 'antd';

export function useSignIn(form: FormInstance) {
    const { setAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async ({ password }: { password: string }) => {
        try {
            await signIn(password);
            setAuthenticated(true);
            setLoading(true);
        } catch (err) {
            if (err instanceof AxiosError && err.status === 401) {
                setError('Błędne hasło.');
            } else {
                setError('Wystąpił błąd po stronie serwera.');
            }
            form.setFieldValue('password', '');
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => {
        setError(null);
    };

    return {
        error,
        loading,
        handleSubmit,
        clearError
    };
}
