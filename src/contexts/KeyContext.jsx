import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { getAesGcmKey } from '../utils';

const KeyContext = createContext();

const KeyProvider = ({
    children,
}) => {
    const [key, setKey] = useState();

    const loadKey = useCallback(async (key) => {
        const aesGcmKey = await getAesGcmKey(key);
        setKey(aesGcmKey);
    }, []);

    const unloadKey = useCallback(() => {
        setKey();
    }, []);

    const value = useMemo(() => ({
        key,
        loadKey,
        unloadKey,
    }), [key, loadKey, unloadKey]);

    return (
        <KeyContext.Provider value={value}>
            {children}
        </KeyContext.Provider>
    );
};

const useKey = () => (
    useContext(KeyContext)
);

export {
    useKey,
};

export default KeyProvider;
