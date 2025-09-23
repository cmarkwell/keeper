import PasswordInput from '../PasswordInput';

import './authenticationForm.css';

const AuthenticationForm = ({ onSubmit }) => (
    <form className='authentication-form' onSubmit={onSubmit}>
        <PasswordInput maxLength='32' required autoFocus />
        <div className='form-actions'>
            <input className='form-actions-item' name='submit' type='submit' value='Unlock' />
        </div>
    </form>
);

export default AuthenticationForm;
