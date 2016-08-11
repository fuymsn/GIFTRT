import { combineReducers } from 'redux';
import { POST_MESSAGE, RECEIVE_MESSAGE, CONNECT, DISCONNECT } from './actions';

import Message from './utils/Message';

const chatLists = (state = [], action) => {
    switch (action.type) {
        case POST_MESSAGE:
            return [
                ...state,
                {
                    text: action.text,
                    id: action.id,
                    type: 0 //自己
                }
            ]
        case RECEIVE_MESSAGE:
            return [
                ...state,
                {
                    text: action.text,
                    id: action.id,
                    type: 1 //别人
                }
            ]
        default:
            return state;
    }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const chatApp = combineReducers({
    chatLists,
    visibilityFilter
});

export default chatApp;

