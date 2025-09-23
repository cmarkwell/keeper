import { use, useMemo } from 'react';

import { useSecrets } from '../../../contexts/SecretsContext';

import SecretsListItem from './SecretsListItem';

import './secretsList.css';

const SecretsList = ({ searchValue, setSecretId }) => {
    const { mySecretsPromise } = useSecrets();

    const mySecrets = use(mySecretsPromise);

    const filteredMySecrets = useMemo(
        () =>
            mySecrets
                .filter(({ website, username, email }) => {
                    const trimmedSearchValue = searchValue.trim().toLowerCase();
                    return (
                        website.trim().toLowerCase().includes(trimmedSearchValue) ||
                        username.trim().toLowerCase().includes(trimmedSearchValue) ||
                        email.trim().toLowerCase().includes(trimmedSearchValue)
                    );
                })
                .sort((secretA, secretB) =>
                    secretA.website.localeCompare(secretB.website, 'en', { sensitivity: 'base' }),
                ),
        [mySecrets, searchValue],
    );

    return (
        <div className='secrets-list'>
            {mySecrets.length === 0 ? (
                <div className='secrets-list-message'>You have no secrets!</div>
            ) : filteredMySecrets.length === 0 ? (
                <div className='secrets-list-message'>No secrets match your search!</div>
            ) : (
                filteredMySecrets.map((secret) => (
                    <SecretsListItem key={secret.id} {...secret} onClick={() => setSecretId(secret.id)} />
                ))
            )}
        </div>
    );
};

export default SecretsList;
