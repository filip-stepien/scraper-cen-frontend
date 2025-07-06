import { Button } from 'antd';
import { useAuth } from '../hooks/useAuth';

export function Login() {
    const { setAuthenticated } = useAuth();

    const click = () => {
        setAuthenticated(true);
    };

    return <Button onClick={click}>Zaloguj się</Button>;
}
