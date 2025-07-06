import { Button } from 'antd';
import { useAuth } from '../hooks/useAuth';

export function LogoutButton() {
    const { setAuthenticated } = useAuth();

    const click = () => {
        setAuthenticated(false);
    };

    return (
        <Button onClick={click} type='primary'>
            Wyloguj
        </Button>
    );
}
