import './secretsListItem.css';

const SecretsListItem = ({ username, website, onClick, skeleton }) => (
    <div className={`secrets-list-item${skeleton ? ' secrets-list-item-skeleton' : ''}`} onClick={onClick}>
        <div className='secrets-list-item-details'>
            <div className='secrets-list-item-detail secrets-list-item-detail-website'>{website}</div>
            <div className='secrets-list-item-detail'>{username}</div>
        </div>
    </div>
);

export default SecretsListItem;
