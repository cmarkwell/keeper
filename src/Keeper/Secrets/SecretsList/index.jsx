import { use, useMemo } from 'react';

import { useSecrets } from '../../../contexts/SecretsContext';

import SecretsListItem from './SecretsListItem';

import './secretsList.css';

const SecretsList = ({ searchValue, setSecretId }) => {
    const trimmedSearchValue = searchValue.trim().toLowerCase();

    const { mySecretsPromise } = useSecrets();
    const mySecrets = use(mySecretsPromise);

    const filteredMySecrets = useMemo(
        () =>
            mySecrets
                .filter(({ website, username, email }) =>
                    [website, username, email].some((property) =>
                        property?.trim().toLowerCase().includes(trimmedSearchValue),
                    ),
                )
                .sort((secretA, secretB) =>
                    secretA.website.localeCompare(secretB.website, 'en', { sensitivity: 'base' }),
                ),
        [mySecrets, trimmedSearchValue],
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
