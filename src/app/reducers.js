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
    SEND_GIFT,
    CONNECT,
    DISCONNECT,
    DRAWER_TOGGLE,
    DRAWER_CLOSE,

    //gift
    GIFT_DIALOG_OPEN,
    GIFT_DIALOG_CLOSE,
    UPDATE_GIFT_LIST,
    
    //home
    SWITCH_HOME_TAB_INDEX,
    UPDATE_HOME_VIDEO_LISTS,

    //rank
    SWITCH_RANK_TAB_INDEX,
    UPDATE_RANK_ANCHOR_LISTS,

    //search
    SEARCH_VIDEO,

    //activity
    UPDATE_ACTIVITY_LISTS

} from './actions';

import Message from './utils/Message';
import Gift from './utils/Gift';

const initialMessage = {
    conversation: [],
    status: false
}

//消息列表
//type: 0 文字信息，1 礼物
const messages = (state = initialMessage, action) => {
    switch (action.type) {
        case POST_MESSAGE:
            return Object.assign({}, state, {
                conversation: [
                    ...state.conversation,
                    {
                        text: new Message(action.text),
                        id: action.id,
                        isSelf: 1, //自己
                        type: 0
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
                        isSelf: 0, //别人
                        type: 0
                    }
                ]
            });
                // {
                //     text: action.text,
                //     id: action.id,
                //     type: 1 //别人
                // }
        
        case SEND_GIFT:
            return Object.assign({}, state, {
                conversation: [
                    ...state.conversation,
                    {
                        text: new Gift(action.giftId),
                        id: action.id,
                        isSelf: 1,
                        type: 1
                    }
                ]
            });

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

const initialGift = {
    dialogIsOpen: false,
    giftList: []
}

const gift = (state = initialGift, action) => {
    switch (action.type){
        case GIFT_DIALOG_OPEN:
        case GIFT_DIALOG_CLOSE:
            return Object.assign({}, state, {
                dialogIsOpen: action.dialogIsOpen
            });
        
        case UPDATE_GIFT_LIST:
            return Object.assign({}, state, {
                giftList: action.giftList
            });
        default:
            return state;
    }
}


/**
 * home页面 slide index
 * state: 默认数据
 * action: 当前传入动作的action数据
 **/
const initialHome = {
    slideIndex: 0,
    videoLists: {
        rec: []
    }
}

const home = (state = initialHome, action) => {
    switch (action.type) {
        case SWITCH_HOME_TAB_INDEX:
            return Object.assign({}, state, {
                slideIndex: action.slideIndex
            });
        
        case UPDATE_HOME_VIDEO_LISTS:
            return Object.assign({}, state, {
                videoLists: action.videoLists
            });
        
        default: 
            return state;
    }
}

/**
 * rank页面 slide index
 **/
const initialRank = {
    slideIndex: 0,
    anchorLists: {
        day: [],
        week: [],
        month: [],
        total: []
    }
}

const rank = (state = initialRank, action) => {
    switch (action.type) {
        case SWITCH_RANK_TAB_INDEX:
            return Object.assign({}, state, {
                slideIndex: action.slideIndex
            });

        case UPDATE_RANK_ANCHOR_LISTS:
            return Object.assign({}, state, {
                anchorLists: action.anchorLists
            });
        default:
            return state;
    }
}

const searchVideos = (state = { videos: [] }, action) => {
    switch (action.type) {
        case SEARCH_VIDEO:
            return action;
        default:
            return state;
    }
}

//activity
const activity = (state = { activityList: [] }, action) => {
    switch (action.type){
        case UPDATE_ACTIVITY_LISTS:
            return action;
        default: 
            return state;
    }
}

const initInstances = {
    PIC_PATH: 'http://p1.1room1.co/public'
}

const instances = (state = initInstances, action) => {
    return state;
}

const reducers = combineReducers({
    instances, //常量
    messages,
    lastAction,
    drawerState,
    gift,
    home,
    rank,
    activity,
    searchVideos
});

/**
 * reducer组件
 **/
export default reducers;
