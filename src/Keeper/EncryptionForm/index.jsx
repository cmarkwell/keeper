import './encryptionForm.css';

const EncryptionForm = ({
    onSubmit,
}) => (
    <form
        id='encryption-form'
        onSubmit={onSubmit}
    >
        <div className='form-item'>
            <label for='username'>Username</label>
            <input
                id='username'
                name='username'
                type='text'
                required
                autoFocus
            />
        </div>
        <div className='form-item'>
            <label for='password'>Password</label>
            <input
                id='password'
                name='password'
                type='password'
                required
            />
        </div>
        <div className='form-item'>
            <input
                id='submit'
                name='submit'
                type='submit'
                value='Encrypt'
            />
        </div>
    </form>
);

export default EncryptionForm;