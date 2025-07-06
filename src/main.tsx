import './style.css';
import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './Router';
import { Provider } from './Provider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider>
            <Router />
        </Provider>
    </StrictMode>
);
