import { useCallback, useMemo, useState } from 'react';

import { useKey } from '../../contexts/KeyContext';
import { useSecrets } from '../../contexts/SecretsContext';
import EncryptionForm from '../EncryptionForm';

import SecretsListActions from './SecretsListActions';
import SecretListItem from './SecretListItem';

import './secrets.css';

const Secrets = () => {
    const { unloadKey } = useKey();
    const { secrets, addSecret, updateSecret } = useSecrets();

    const [showEncryptionForm, setShowEncryptionForm] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [secretId, setSecretId] = useState(null);

    const handleEncyptionFormClosed = useCallback(() => {
        setShowEncryptionForm(false);
        setSecretId(null);
    }, []);

    const handleEncryptionFormSubmitted = useCallback(async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { username, password, website } = Object.fromEntries([...formData.entries()]);
        if (secretId) {
            updateSecret({
                id: secretId,
                username,
                password,
                website,
            });
        } else {
            addSecret(
                username,
                password,
                website,
            );
        }
        handleEncyptionFormClosed();
        return false;
    }, [addSecret, handleEncyptionFormClosed, secretId, updateSecret]);

    const filteredSecrets = useMemo(() => (
        secrets
            .filter(({ username, website }) => (
                username.trim().toLowerCase().includes(searchValue.trim().toLowerCase()) ||
                website.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
            ))
            .sort((secretA, secretB) => (
                secretA.website.localeCompare(secretB.website, 'en', { sensitivity: 'base' })
            ))
    ), [searchValue, secrets]);

    const selectedSecret = useMemo(() => (
        secrets.find(({ id }) => id === secretId)
    ), [secretId, secrets]);

    return (
        <div className='secrets'>
            {
                showEncryptionForm || selectedSecret ? (
                    <EncryptionForm
                        {...selectedSecret}
                        onSubmit={handleEncryptionFormSubmitted}
                        onCancel={handleEncyptionFormClosed}
                    />
                ) : (
                    <>
                        <SecretsListActions
                            onAddNewClicked={() => setShowEncryptionForm(true)}
                            onLogOutClicked={unloadKey}
                        />
                        <input
                            id='secrets-list-search'
                            type='search'
                            placeholder='Search'
                            autoFocus
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                        />
                        <div className='secrets-list'>
                            {
                                secrets.length === 0 ? (
                                    <div className='secrets-list-message'>You have no secrets!</div>
                                ) : filteredSecrets.length === 0 ? (
                                    <div className='secrets-list-message'>No secrets match your search!</div>
                                ) : filteredSecrets.map((secret) => (
                                    <SecretListItem
                                        key={secret.id}
                                        {...secret}
                                        onClick={() => setSecretId(secret.id)}
                                    />
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Secrets;
