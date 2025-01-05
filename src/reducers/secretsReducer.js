const ADD_SECRET = 'ADD_SECRET';
const UPDATE_SECRET = 'UPDATE_SECRET';
const DELETE_SECRET = 'DELETE_SECRET';
const LOAD_SECRETS = 'LOAD_SECRETS';

function secretsReducer(state, action) {
    switch (action.type) {
        case LOAD_SECRETS: {
            return action.payload ?? state;
        }
        case ADD_SECRET: {
            const secret = {
                id: self.crypto.randomUUID(),
                dateCreated: Date.now(),
                ...action.payload,
            };
            return state.concat(secret);
        }
        case UPDATE_SECRET: {
            return state.map(
                (secret) => secret.id === action.payload.id
                    ? action.payload
                    : secret,
            );
        }
        case DELETE_SECRET: {
            return state.filter(({ id }) => id !== action.payload);
        }
        default: {
            return state;
        }
    }
}

export {
    ADD_SECRET,
    UPDATE_SECRET,
    DELETE_SECRET,
    LOAD_SECRETS,
};

export default secretsReducer;
