import { useAuth } from './hooks/useAuth';
import { App } from './routes/App';
import { Login } from './routes/Login';

export function Router() {
    const { authenticated } = useAuth();
    return authenticated ? <App /> : <Login />;
}
