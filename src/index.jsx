import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Keeper from './Keeper';
import KeyProvider from './contexts/KeyContext';
import SecretsProvider from './contexts/SecretsContext';

import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './index.css';

const root = document.getElementById('root');

createRoot(root).render(
    <StrictMode>
        <KeyProvider>
            <SecretsProvider>
                <Keeper />
            </SecretsProvider>
        </KeyProvider>
    </StrictMode>,
);
