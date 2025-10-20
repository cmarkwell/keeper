import { Suspense, useCallback, useMemo, useState } from 'react';

import { useKey } from '../../contexts/KeyContext';
import { useSecrets } from '../../contexts/SecretsContext';
import EncryptionForm from '../EncryptionForm';

import SecretsList from './SecretsList';
import SecretsListActions from './SecretsListActions';
import SecretsListItem from './SecretsList/SecretsListItem';

import './secrets.css';

const Secrets = () => {
    const { unloadKey } = useKey();
    const { secrets, addSecret, updateSecret } = useSecrets();

    const [showEncryptionForm, setShowEncryptionForm] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [secretId, setSecretId] = useState(null);

    const selectedSecret = useMemo(() => secrets.find(({ id }) => id === secretId), [secretId, secrets]);

    const handleEncyptionFormClosed = useCallback(() => {
        setShowEncryptionForm(false);
        setSecretId(null);
    }, []);

    const handleEncryptionFormSubmitted = useCallback(
        async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const { username, email, password, website } = Object.fromEntries([...formData.entries()]);
            if (selectedSecret) {
                updateSecret({
                    id: selectedSecret.id,
                    dateLastModified: selectedSecret.dateLastModified,
                    username,
                    email,
                    password,
                    website,
                });
            } else {
                addSecret({ username, email, password, website });
            }
            handleEncyptionFormClosed();
            return false;
        },
        [addSecret, handleEncyptionFormClosed, selectedSecret, updateSecret],
    );

    return (
        <div className='secrets'>
            {showEncryptionForm || selectedSecret ? (
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
                    <div className='secrets-list-search-container'>
                        <input
                            className='secrets-list-search'
                            type='search'
                            placeholder='Search by site, username, or email'
                            autoFocus
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                        />
                    </div>
                    <Suspense fallback={<SecretsListItem skeleton />}>
                        <SecretsList searchValue={searchValue} setSecretId={setSecretId} />
                    </Suspense>
                </>
            )}
        </div>
    );
};

export default Secrets;
