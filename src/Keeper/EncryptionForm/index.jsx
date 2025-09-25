import { useCallback, useEffect, useState } from 'react';

import Button from '../../components/Button';
import { useKey } from '../../contexts/KeyContext';
import { useSecrets } from '../../contexts/SecretsContext';
import { aesGcmDecrypt, decode } from '../../utils';
import PasswordInput from '../PasswordInput';

import './encryptionForm.css';

const EncryptionForm = ({ id, username = '', email = '', password = '', website = '', onSubmit, onCancel }) => {
    const { key } = useKey();
    const { deleteSecret } = useSecrets();

    const [readOnly, setReadOnly] = useState(id);
    const [defaultPassword, setDefaultPassword] = useState();

    const onClickDelete = useCallback(() => {
        // TODO: Use custom confirm, browser confirm wrecks the extension
        deleteSecret(id);
        onCancel();
    }, [deleteSecret, id, onCancel]);

    useEffect(() => {
        aesGcmDecrypt(password, key).then((result) => setDefaultPassword(decode(result)));
    }, [password, key]);

    return (
        <>
            <div className='encryption-form-actions'>
                <Button leftIcon='bi-arrow-left' onClick={onCancel}>
                    Back
                </Button>
                {id && (
                    <div>
                        <Button
                            rightIcon={`bi-${readOnly ? 'pencil' : 'x'}`}
                            title={readOnly ? 'Edit this secret' : 'Cancel edits'}
                            onClick={() => setReadOnly((old) => !old)}
                        >
                            {readOnly ? 'Edit' : 'Cancel'}
                        </Button>
                        <Button rightIcon='bi-trash' title='Delete this secret' onClick={onClickDelete}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <form className='encryption-form' onSubmit={onSubmit}>
                <div className='form-item'>
                    <label htmlFor='website'>Website</label>
                    <input
                        className='website'
                        name='website'
                        type='text'
                        defaultValue={website}
                        readOnly={readOnly}
                        required
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor='username'>Username</label>
                    <input
                        className='username'
                        name='username'
                        type='text'
                        defaultValue={username}
                        readOnly={readOnly}
                        autoFocus={!readOnly}
                        required
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor='email'>Email</label>
                    <input
                        className='email'
                        name='email'
                        type='email'
                        defaultValue={email}
                        readOnly={readOnly}
                        placeholder={readOnly ? 'None' : undefined}
                    />
                </div>
                <PasswordInput defaultValue={defaultPassword} readOnly={readOnly} required />
                {!readOnly && (
                    <div className='form-actions'>
                        <input className='form-actions-item' name='submit' type='submit' value='Encrypt' />
                    </div>
                )}
            </form>
        </>
    );
};

export default EncryptionForm;
