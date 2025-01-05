import './secretListItem.css';

const SecretListItem = ({
    username,
    website,
    onClick,
}) => (
    <div
        className='secret-list-item'
        onClick={onClick}
    >
        <div className='secret-list-item-details'>
            <div className='secret-list-item-detail secret-list-item-detail-website'>
                {website}
            </div>
            <div className='secret-list-item-detail'>
                {username}
            </div>
        </div>
    </div>
);

export default SecretListItem;
