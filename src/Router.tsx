import { useAuth } from './hooks/useAuth';
import { App } from './pages/App';
import { Login } from './pages/Login';
import { Loading } from './pages/Loading';

export function Router() {
    const { authenticated } = useAuth();

    if (authenticated === null) {
        return <Loading />;
    }

    return authenticated ? <App /> : <Login />;
}
