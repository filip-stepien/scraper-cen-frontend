import type { JSX } from 'react';
import { AuthContextProvider } from './providers/AuthContextProvider';

export function Provider({ children }: { children: JSX.Element }) {
    return <AuthContextProvider>{children}</AuthContextProvider>;
}
