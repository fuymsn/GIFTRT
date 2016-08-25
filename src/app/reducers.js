/**
 * reducers 指明应用如何更新 state
 * 不要在reducers里面做如下操作：
 * 1. 修改传入参数
 * 2. 执行有副作用的操作，API请求或者路由跳转
 * 3. 调用非纯函数，入Date.now()
 */

import { combineReducers } from 'redux';
import {
    RECEIVE_MESSAGE,
    POST_MESSAGE,
    CONNECT,
    DISCONNECT,
    DRAWER_TOGGLE,
    DRAWER_CLOSE,
    GIFT_DIALOG_OPEN,
    GIFT_DIALOG_CLOSE,
    HOME_TAB_INDEX,
    RANK_TAB_INDEX
} from './actions';

import Message from './utils/Message';

const initialMessage = {
    conversation: [],
    status: false
}

//消息列表
const messages = (state = initialMessage, action) => {
    switch (action.type) {
        case POST_MESSAGE:
            return Object.assign({}, state, {
                conversation: [
                    ...state.conversation,
                    {
                        text: new Message(action.text),
                        id: action.id,
                        type: 0 //别人
                    }
                ]
            });

        case RECEIVE_MESSAGE:
            return Object.assign({}, state, {
                conversation: [
                    ...state.conversation,
                    {
                        text: new Message(action.message),
                        id: action.id,
                        type: 1 //别人
                    }
                ]
            });
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
const lastAction = ( state = null, action ) => {
    return action;
}

/**
 * appbar 侧边栏
 **/
const drawerState = (state = { open: false }, action) => {
    switch (action.type){
        case DRAWER_TOGGLE:
            return {
                open: !action.open
            };
        case DRAWER_CLOSE:
            return {
                open: false
            };
        default:
            return state;
    }
}

const giftDialogState = (state = { open: false }, action) => {
    switch (action.type){
        case GIFT_DIALOG_OPEN:
        case GIFT_DIALOG_CLOSE:
            return {
                open: action.open
            }
        default:
            return state;
    }
}


//slide index 初始化
const initialSlideIndex = {
    slideIndex: 0
}

/**
 * home页面 slide index
 * state: 默认数据
 * action: 当前传入动作的action数据
 **/
const homeSlideIndex = (state = initialSlideIndex, action) => {
    switch (action.type) {
        case HOME_TAB_INDEX:
            return action;
        default: 
            return state;
    }
}
//rank页面 slide index
const rankSlideIndex = (state = initialSlideIndex, action) => {
    switch (action.type) {
        case RANK_TAB_INDEX:
            return action
        default:
            return state;
    }
}

const reducers = combineReducers({
    messages,
    lastAction,
    drawerState,
    giftDialogState,
    homeSlideIndex,
    rankSlideIndex
});

/**
 * reducer组件
 **/
export default reducers;
