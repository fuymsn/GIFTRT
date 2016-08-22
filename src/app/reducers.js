import { combineReducers } from 'redux';
import { POST_MESSAGE, RECEIVE_MESSAGE, CONNECT, DISCONNECT } from './actions';

import Message from './utils/Message';

const initialState = {
    conversation: [],
    status: false
}

//消息列表
const messages = (state = initialState, action) => {
    switch (action.type) {
        case POST_MESSAGE:
            return {
                conversation: [
                    ...state,
                    {
                        text: new Message(action.text),
                        id: action.id,
                        type: 0 //自己
                    }
                ]
            }
        case RECEIVE_MESSAGE:
            return {
                conversation: [
                    ...state,
                    {
                        text: new Message(action.text),
                        id: action.id,
                        type: 1 //别人
                    }
                ]
            }
                // {
                //     text: action.text,
                //     id: action.id,
                //     type: 1 //别人
                // }
        
        case CONNECT:
            return {
                conversation: [],
                status: true
            }
        
        case DISCONNECT:
            return {
                conversation: [],
                status: false
            }

        default:
            return state;
    }
}

//最后一条消息
const lastAction = (state = null, action) => {
    return action;
}

//appbar 侧边栏
const drawerState = (state = null, action) => {
    return action;
}

//home页面 slide index
const homeSlideIndex = (state = { slideIndex: 0 }, action) => {
    return action;
}

//home页面 slide index
const rankSlideIndex = (state = { slideIndex: 0 }, action) => {
    return action;
}

const reducers = combineReducers({
    messages,
    lastAction,
    drawerState,
    homeSlideIndex,
    rankSlideIndex
});

/**
 * reducer组件
 **/
export default reducers;
