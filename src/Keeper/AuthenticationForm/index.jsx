import PasswordInput from '../PasswordInput';
import Button from '../../components/Button';

import './authenticationForm.css';

const AuthenticationForm = ({ onSubmit }) => (
    <form className='authentication-form' onSubmit={onSubmit}>
        <PasswordInput maxLength='32' required autoFocus />
        <div className='form-actions'>
            <Button type='submit' className='form-actions-item'>
                Unlock
            </Button>
        </div>
    </form>
);

export default AuthenticationForm;
