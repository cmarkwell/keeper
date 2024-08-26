import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Keeper from './Keeper';

import './index.css';

const root = document.getElementById('root');

createRoot(root).render((
    <StrictMode>
        <Keeper />
    </StrictMode>
));