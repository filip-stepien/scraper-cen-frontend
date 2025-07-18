import { Button } from 'antd';
import { useSignOut } from '@/hooks/useSignOut';

type Props = {
    className?: string;
};

export function LogoutButton({ className = '' }: Props) {
    const { loading, signOut } = useSignOut();

    return (
        <Button
            onClick={signOut}
            loading={loading}
            type="primary"
            className={className}
        >
            Wyloguj
        </Button>
    );
}
