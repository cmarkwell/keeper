import './secretsListActions.css';

const SecretsListActions = ({
    onAddNewClicked,
    onLogOutClicked,
}) => {
    return (
        <div className='secrets-list-actions'>
            <button
                className='keeper-button keeper-button-icon'
                onClick={onAddNewClicked}
            >
                <i className='bi-plus-lg' />Add New
            </button>
            <button
                className='keeper-button keeper-button-icon'
                onClick={onLogOutClicked}
            >
                <i className='bi-door-open' />Log Out
            </button>
        </div>
    );
};

export default SecretsListActions;
