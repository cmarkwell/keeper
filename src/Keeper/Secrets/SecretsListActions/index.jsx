import { Suspense, useCallback, useState } from 'react';

import Button from '../../../components/Button';
import { useKey } from '../../../contexts/KeyContext';
import { useSecrets } from '../../../contexts/SecretsContext';
import { useToast } from '../../../contexts/ToastContext';
import { aesGcmDecrypt, getFileText } from '../../../utils';

import ExportButton from './ExportButton';

import './secretsListActions.css';

const SecretsListActions = ({ onAddNewClicked, onLogOutClicked }) => {
    const { key } = useKey();
    const { importSecret } = useSecrets();
    const { toast } = useToast();

    const [isMoreExpanded, setIsMoreExpanded] = useState(false);

    const onMoreClicked = useCallback(() => {
        setIsMoreExpanded((lastIsMoreExpanded) => !lastIsMoreExpanded);
    }, []);

    const onImportClicked = useCallback(async () => {
        const fileSystemFileHandles = await window.showOpenFilePicker({
            types: [{ accept: { 'text/plain': '.kpr' } }],
            multiple: true,
        });

        const importPromises = fileSystemFileHandles.flatMap(async (fileSystemFileHandle) => {
            const file = await fileSystemFileHandle.getFile();
            const fileText = await getFileText(file);
            const importedSecrets = JSON.parse(atob(fileText));
            return importedSecrets.map((importedSecret) =>
                aesGcmDecrypt(importedSecret.password, key).then(() => importSecret(importedSecret)),
            );
        });

        Promise.allSettled(importPromises).then((results) => {
            const fulfilled = [];
            const rejected = [];
            results.forEach((result) => {
                (result.state === 'fulfilled' ? fulfilled : rejected).push(result);
            });

            let content;
            if (fulfilled.length && rejected.length) {
                content = `Successfully imported ${fulfilled.length} and failed to import ${rejected.length} accounts`;
            } else if (fulfilled.length) {
                content = `Successfully imported ${fulfilled.length} accounts`;
            } else {
                content = `Failed to import ${rejected.length} accounts`;
            }

            toast({ content });
        });
    }, [key, importSecret, toast]);

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
