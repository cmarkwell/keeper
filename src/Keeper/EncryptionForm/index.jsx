import { useCallback, useEffect, useMemo, useState } from 'react';

import { IV_BYTELENGTH } from '../../consts';
import { useKey } from '../../contexts/KeyContext';
import { useSecrets } from '../../contexts/SecretsContext';
import { aesGcmDecrypt, decode } from '../../utils';
import PasswordInput from '../PasswordInput';

import './encryptionForm.css';

const EncryptionForm = ({
    id,
    username = '',
    password = '',
    website = '',
    onSubmit,
    onCancel,
}) => {
    const { key } = useKey();
    const { deleteSecret } = useSecrets();

    const [readOnly, setReadOnly] = useState(id);
    const [defaultPassword, setDefaultPassword] = useState();

    const [data, iv] = useMemo(() => [
        new Uint8Array(password.slice(0, -IV_BYTELENGTH)),
        new Uint8Array(password.slice(-IV_BYTELENGTH)),
    ], [password]);

    const onClickDelete = useCallback(() => {
        // TODO: Use custom confirm, browser confirm wrecks the extension
        deleteSecret(id);
        onCancel();
    }, [deleteSecret, id, onCancel]);

    // TODO: This should maybe employ the new use hook in React 19
    useEffect(() => {
        aesGcmDecrypt(data, key, iv)
            .then((result) => setDefaultPassword(decode(result)));
    }, [data, iv, key]);

    return (
        <>
            <div className='encryption-form-actions'>
                <button
                    className='keeper-button keeper-button-icon'
                    onClick={onCancel}
                >
                    <i className='bi-arrow-left' />Back
                </button>
                {
                    id && (
                        <div>
                            <button
                                className='keeper-button keeper-button-icon'
                                title={readOnly ? 'Edit this secret' : 'Cancel edits'}
                                onClick={() => setReadOnly((old) => !old)}
                            >
                                <i className={`bi-${readOnly ? 'pencil' : 'x'}`} />{readOnly ? 'Edit' : 'Cancel'}
                            </button>
                            <button
                                className='keeper-button keeper-button-icon encryption-form-actions-delete'
                                title='Delete this secret'
                                onClick={onClickDelete}
                            >
                                <i className='bi-trash' />Delete
                            </button>
                        </div>
                    )
                }
            </div>
            <form
                id='encryption-form'
                onSubmit={onSubmit}
            >
                <div className='form-item'>
                    <label htmlFor='username'>Username</label>
                    <input
                        id='username'
                        name='username'
                        type='text'
                        defaultValue={username}
                        readOnly={readOnly}
                        autoFocus={!readOnly}
                        required
                    />
                </div>
                <PasswordInput
                    defaultValue={defaultPassword}
                    readOnly={readOnly}
                    required
                />
                <div className='form-item'>
                    <label htmlFor='website'>Website</label>
                    <input
                        id='website'
                        name='website'
                        type='text'
                        defaultValue={website}
                        readOnly={readOnly}
                        required
                    />
                </div>
                {
                    !readOnly && (
                        <div className='form-actions'>
                            <input
                                id='submit'
                                className='form-actions-item'
                                name='submit'
                                type='submit'
                                value='Encrypt'
                            />
                        </div>
                    )
                }
            </form>
        </>
    );
};

export default EncryptionForm;
