import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';

import secretsReducer, { ADD_SECRET, DELETE_SECRET, LOAD_SECRETS, UPDATE_SECRET } from '../reducers/secretsReducer';
import { useKey } from './KeyContext';
import { aesGcmEncrypt } from '../utils';

const SecretsContext = createContext();

const SecretsProvider = ({
    children,
}) => {
    const { key } = useKey();
    const [secrets, dispatch] = useReducer(secretsReducer);

    const addSecret = useCallback(async (username, password, website) => {
        const newSecret = {
            website,
            username,
            password: await aesGcmEncrypt(password, key),
        };
        dispatch({
            type: ADD_SECRET,
            payload: newSecret,
        });
    }, [key]);

    const updateSecret = useCallback(async (secret) => {
        const newSecret = {
            ...secret,
            password: await aesGcmEncrypt(secret.password, key),
        };
        dispatch({
            type: UPDATE_SECRET,
            payload: newSecret,
        });
    }, [key]);

    const deleteSecret = useCallback((id) => {
        dispatch({
            type: DELETE_SECRET,
            payload: id,
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.get('keeper-secrets')
            .then((results = {}) => {
                dispatch({
                    type: LOAD_SECRETS,
                    payload: results['keeper-secrets'],
                });
            });
    }, []);

    useEffect(() => {
        if (secrets) {
            chrome.storage.local.set({
                'keeper-secrets': secrets,
            });
        }
    }, [secrets]);

    const value = useMemo(() => ({
        secrets,
        addSecret,
        updateSecret,
        deleteSecret,
    }), [secrets, addSecret, updateSecret, deleteSecret]);

    return (
        <SecretsContext.Provider value={value}>
            {children}
        </SecretsContext.Provider>
    );
};

const useSecrets = () => (
    useContext(SecretsContext)
);

export {
    useSecrets,
};

export default SecretsProvider;
