import { createContext, use, useCallback, useEffect, useMemo, useReducer } from 'react';

import secretsReducer, {
    ADD_SECRET,
    DELETE_SECRET,
    IMPORT_SECRET,
    LOAD_SECRETS,
    UPDATE_SECRET,
} from '../reducers/secretsReducer';
import { useKey } from './KeyContext';
import { aesGcmDecrypt, aesGcmEncrypt } from '../utils';

const SecretsContext = createContext();

const SecretsProvider = ({ children }) => {
    const { key } = useKey();
    const [secrets, dispatch] = useReducer(secretsReducer);

    const mySecretsPromise = useMemo(
        () =>
            Promise.allSettled(
                secrets?.map((secret) => aesGcmDecrypt(secret.password, key).then(() => secret)) ?? [],
            ).then((results) => results.map(({ value }) => value).filter(Boolean)),
        [secrets, key],
    );

    const addSecret = useCallback(
        async (secret) => {
            const newSecret = {
                ...secret,
                password: await aesGcmEncrypt(secret.password, key),
            };
            dispatch({
                type: ADD_SECRET,
                payload: newSecret,
            });
        },
        [key],
    );

    const importSecret = useCallback(
        (secret) => {
            if (secrets.some(({ id }) => id === secret.id)) {
                throw new Error(`A secret with the id ${secret.id} already exists`);
            }
            dispatch({
                type: IMPORT_SECRET,
                payload: secret,
            });
        },
        [secrets],
    );

    const updateSecret = useCallback(
        async (secret) => {
            const newSecret = {
                ...secret,
                password: await aesGcmEncrypt(secret.password, key),
            };
            dispatch({
                type: UPDATE_SECRET,
                payload: newSecret,
            });
        },
        [key],
    );

    const deleteSecret = useCallback((id) => {
        dispatch({
            type: DELETE_SECRET,
            payload: id,
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.get('keeper-secrets').then((results = {}) => {
            dispatch({
                type: LOAD_SECRETS,
                payload: results['keeper-secrets'] ?? [],
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

    const value = useMemo(
        () => ({
            secrets,
            mySecretsPromise,
            addSecret,
            importSecret,
            updateSecret,
            deleteSecret,
        }),
        [secrets, mySecretsPromise, addSecret, importSecret, updateSecret, deleteSecret],
    );

    return <SecretsContext.Provider value={value}>{children}</SecretsContext.Provider>;
};

const useSecrets = () => use(SecretsContext);

export { useSecrets };

export default SecretsProvider;
