import Button from '../Button';

import './toast.css';

const Toast = ({ action, actionLabel, content, id, onClose }) => (
    <div className='toast'>
        <div className='toast-body'>
            <div className='toast-content'>{content}</div>
            <Button leftIcon='bi-x-lg' onClick={() => onClose(id)} />
        </div>
        {action && (
            <div className='toast-actions'>
                <Button onClick={action}>{actionLabel}</Button>
            </div>
        )}
    </div>
);

export default Toast;
