import { useCallback, useMemo, useState } from 'react';

import { getAesGcmKey } from '../utils';
import AuthenticationForm from './AuthenticationForm';

import './keeper.css';

const Keeper = () => {
    const [key, setKey] = useState();

    const handleAuthenticationFormSubmitted = useCallback(async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const { password } = Object.fromEntries([...formData.entries()]);
        const aesGcmKey = await getAesGcmKey(password);
        setKey(aesGcmKey);

        // const encrypted = await aesGcmEncrypt(password, key);
        // const decrypted = await aesGcmDecrypt(encrypted, key);
        // console.log(decode(decrypted));
    
        return false;
    }, []);

    return (
        <div id='keeper'>
            <h1 id='keeper-header'>Keeper</h1>
            {
                key ? (
                    <Secrets />
                ) : (
                    <AuthenticationForm
                        onSubmit={handleAuthenticationFormSubmitted}
                    />
                )
            }
        </div>
    );
};

export default Keeper;