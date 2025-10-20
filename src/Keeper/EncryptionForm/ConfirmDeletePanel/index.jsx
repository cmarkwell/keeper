import { useCallback } from 'react';

import Button from '../../../components/Button';
import { useSecrets } from '../../../contexts/SecretsContext';

import './confirmDeletePanel.css';

const ConfirmDeletePanel = ({ id, website, onCancel }) => {
    const { deleteSecret } = useSecrets();

    const onDeleteClicked = useCallback(() => {
        deleteSecret(id);
        onCancel();
    }, [deleteSecret, id, onCancel]);

    return (
        <>
            <div className='confirm-delete-panel-header'>
                <Button leftIcon='bi-arrow-left' onClick={onCancel}>
                    Back
                </Button>
            </div>
            <div className='confirm-delete-panel'>
                <div className='confirm-delete-panel-body'>
                    <h3>Delete {website}</h3>
                    Are you sure that you would like to delete this account? This action cannot be undone.
                </div>
                <div className='confirm-delete-panel-actions'>
                    <Button className='cancel-button' onClick={onCancel}>
                        No, cancel
                    </Button>
                    <Button onClick={onDeleteClicked}>Yes, delete</Button>
                </div>
            </div>
        </>
    );
};

export default ConfirmDeletePanel;
