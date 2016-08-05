import { combineReducers } from 'redux';
import { ADD_CHAT_ITEM_RIGHT, UPDATE_CHAT_ITEM_LEFT } from './actions';

const chatLists = (state = [], action) => {
    switch (action.type) {
        case ADD_CHAT_ITEM_RIGHT:
            return [
                ...state,
                {
                    text: action.text
                }
            ]
        case UPDATE_CHAT_ITEM_LEFT:
            return [
                ...state,
                {
                    text: action.text
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

