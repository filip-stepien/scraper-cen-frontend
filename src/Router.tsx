import { useAuth } from './hooks/useAuth';
import { App } from './pages/App';
import { Loading } from './pages/Loading';
import { Login } from './pages/Login';

export function Router() {
    const { authenticated } = useAuth();

    if (authenticated === null) {
        return <Loading />;
    }

    return authenticated ? <App /> : <Login />;
}
