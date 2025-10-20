import { useEffect, useState } from 'react';

import Button from '../../components/Button';
import { useKey } from '../../contexts/KeyContext';
import { aesGcmDecrypt, decode } from '../../utils';
import PasswordInput from '../PasswordInput';

import './encryptionForm.css';
import ConfirmDeletePanel from './ConfirmDeletePanel';

const EncryptionForm = ({ id, username = '', email = '', password = '', website = '', onSubmit, onCancel }) => {
    const { key } = useKey();

    const [readOnly, setReadOnly] = useState(id);
    const [defaultPassword, setDefaultPassword] = useState();
    const [showConfirmDeletePanel, setShowConfirmDeletePanel] = useState(false);

    useEffect(() => {
        aesGcmDecrypt(password, key).then((result) => setDefaultPassword(decode(result)));
    }, [password, key]);

    if (showConfirmDeletePanel) {
        return (
            <ConfirmDeletePanel
                id={id}
                username={username}
                website={website}
                onCancel={() => setShowConfirmDeletePanel(false)}
            />
        );
    }

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
                        {readOnly && (
                            <Button
                                rightIcon='bi-trash'
                                title='Delete this secret'
                                onClick={() => setShowConfirmDeletePanel(true)}
                            >
                                Delete
                            </Button>
                        )}
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
                        autoFocus={!readOnly}
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
                        <Button className='form-actions-item' type='submit'>
                            Encrypt
                        </Button>
                    </div>
                )}
            </form>
        </>
    );
};

export default EncryptionForm;
