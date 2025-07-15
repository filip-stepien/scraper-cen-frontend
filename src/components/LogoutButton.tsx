import { Button } from 'antd';
import { useSignOut } from '@/hooks/useSignOut';

export function LogoutButton() {
    const { loading, signOut } = useSignOut();

    return (
        <Button onClick={signOut} loading={loading} type="primary">
            Wyloguj
        </Button>
    );
}
