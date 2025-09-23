import { useState } from 'react';

const PasswordInput = (inputProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className='form-item'>
            <label htmlFor='password'>Password</label>
            <div className='form-item-input'>
                <input
                    className='password'
                    name='password'
                    type={passwordVisible ? 'text' : 'password'}
                    {...inputProps}
                />
                <i
                    className={`bi-eye${passwordVisible ? '-slash' : ''}`}
                    title={`${passwordVisible ? 'Hide' : 'Show'} password`}
                    onClick={() => setPasswordVisible((old) => !old)}
                />
            </div>
        </div>
    );
};

export default PasswordInput;
