import './authenticationForm.css';

const AuthenticationForm = ({
    onSubmit,
}) => (
    <form
        id='authentication-form'
        onSubmit={onSubmit}
    >
        <div className='form-item'>
            <label for='password'>Password</label>
            <input
                id='password'
                name='password'
                type='password'
                maxLength='32'
                required
                autoFocus
            />
        </div>
        <div className='form-item'>
            <input
                id='submit'
                name='submit'
                type='submit'
                value='Unlock'
            />
        </div>
    </form>
);

export default AuthenticationForm;