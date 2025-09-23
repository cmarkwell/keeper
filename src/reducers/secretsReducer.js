const ADD_SECRET = 'ADD_SECRET';
const IMPORT_SECRET = 'IMPORT_SECRET';
const UPDATE_SECRET = 'UPDATE_SECRET';
const DELETE_SECRET = 'DELETE_SECRET';
const LOAD_SECRETS = 'LOAD_SECRETS';

function secretsReducer(state, action) {
    switch (action.type) {
        case LOAD_SECRETS: {
            return action.payload ?? state;
        }
        case ADD_SECRET: {
            const dateCreated = Date.now();
            const secret = {
                id: self.crypto.randomUUID(),
                dateCreated,
                dateLastModified: dateCreated,
                ...action.payload,
            };
            return state.concat(secret);
        }
        case IMPORT_SECRET:
            return state.concat(action.payload);
        case UPDATE_SECRET: {
            return state.map((secret) =>
                secret.id === action.payload.id && secret.dateLastModified === action.payload.dateLastModified
                    ? { ...action.payload, dateLastModified: Date.now() }
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

export { ADD_SECRET, IMPORT_SECRET, UPDATE_SECRET, DELETE_SECRET, LOAD_SECRETS };

export default secretsReducer;
