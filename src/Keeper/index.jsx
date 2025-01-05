import { useCallback } from 'react';

import { useKey } from '../contexts/KeyContext';
import AuthenticationForm from './AuthenticationForm';
import Secrets from './Secrets';

import './keeper.css';

const Keeper = () => {
    const { key, loadKey } = useKey();

    const handleAuthenticationFormSubmitted = useCallback(async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { password } = Object.fromEntries([...formData.entries()]);
        loadKey(password);
        return false;
    }, [loadKey]);

    return (
        <div className='keeper'>
            <h1 className={`keeper-header keeper-header${key ? '' : '-no'}-key`}>
                Keeper
            </h1>
            {
                key ? (
                    <Secrets />
                ) : (
                    <AuthenticationForm onSubmit={handleAuthenticationFormSubmitted} />
                )
            }
        </div>
    );
};

export default Keeper;
