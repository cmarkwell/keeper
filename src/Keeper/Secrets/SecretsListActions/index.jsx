import { Suspense, useCallback, useState } from 'react';

import Button from '../../../components/Button';
import { useKey } from '../../../contexts/KeyContext';
import { useSecrets } from '../../../contexts/SecretsContext';
import { aesGcmDecrypt, getFileText } from '../../../utils';

import ExportButton from './ExportButton';

import './secretsListActions.css';

const SecretsListActions = ({ onAddNewClicked, onLogOutClicked }) => {
    const { key } = useKey();
    const { importSecret } = useSecrets();

    const [isMoreExpanded, setIsMoreExpanded] = useState(false);

    const onMoreClicked = useCallback(() => {
        setIsMoreExpanded((lastIsMoreExpanded) => !lastIsMoreExpanded);
    }, []);

    const onImportClicked = useCallback(() => {
        window
            .showOpenFilePicker({ types: [{ accept: { 'text/plain': '.kpr' } }], multiple: true })
            .then((fileSystemFileHandles) => {
                fileSystemFileHandles.forEach(async (fileSystemFileHandle) => {
                    const file = await fileSystemFileHandle.getFile();
                    const fileText = await getFileText(file);
                    const importedSecrets = JSON.parse(atob(fileText));

                    importedSecrets.forEach((importedSecret) => {
                        aesGcmDecrypt(importedSecret.password, key)
                            .then(() => importSecret(importedSecret))
                            .catch((error) => console.error('Failed to import secret', error));
                    });
                });
            });
    }, [key, importSecret]);

    return (
        <>
            <div className='secrets-list-actions'>
                <Button leftIcon='bi-plus-lg' onClick={onAddNewClicked}>
                    Add New
                </Button>
                <Button rightIcon='bi-three-dots-vertical' onClick={onMoreClicked}>
                    More
                </Button>
            </div>
            {isMoreExpanded && (
                <div className='secrets-list-more'>
                    <div className='secrets-list-more-header'>
                        <Button leftIcon='bi-x-lg' onClick={onMoreClicked} />
                    </div>
                    <div className='secrets-list-more-actions'>
                        <div className='secrets-list-more-actions-top'>
                            <Button rightIcon='bi-download' onClick={onImportClicked}>
                                Import
                            </Button>
                            <Suspense fallback={null}>
                                <ExportButton />
                            </Suspense>
                        </div>
                        <Button rightIcon='bi-door-open' onClick={onLogOutClicked}>
                            Log Out
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SecretsListActions;
