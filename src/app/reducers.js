/**
 * reducers 指明应用如何更新 state
 * 不要在reducers里面做如下操作：
 * 1. 修改传入参数
 * 2. 执行有副作用的操作，API请求或者路由跳转
 * 3. 调用非纯函数，入Date.now()
 */

import {combineReducers} from "redux";
import deepAssign from "deep-assign";
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

    //rank
    CHANGE_RANK_DROPDOWN_VALUE,
    SWITCH_RANK_TAB_INDEX,
    UPDATE_RANK_ANCHOR_LISTS,

    //search
    SEARCH_VIDEO,

    //activity
    UPDATE_ACTIVITY_LISTS,
    UPDATE_ACTIVITY_DETAILS,
    //user
    UPDATE_USER_INFO,

    //videolist
    UPDATE_VIDEO_LISTS,
    UPDATE_VIDEO_SCROLL_PAGE,
    UPDATE_VIDEO_SCROLLABLE,
    UPDATE_VIDEOS,

    //Snackbar
    UPDATE_SNACKBAR
} from "./actions";

import Message from "./utils/Message";
import Gift from "./utils/Gift";

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
const lastAction = (state = null, action) => {
    return action;
}

/**
 * appbar 侧边栏
 **/
const drawerState = (state = {open: false}, action) => {
    switch (action.type) {
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

/**
 * 送礼数据初始化
 */
const initialGift = {
    dialogIsOpen: false,
    giftList: []
}

const gift = (state = initialGift, action) => {
    switch (action.type) {
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
    slideIndex: 0
}

const home = (state = initialHome, action) => {
    switch (action.type) {
        case SWITCH_HOME_TAB_INDEX:
            return Object.assign({}, state, {
                slideIndex: action.slideIndex
            });

        default:
            return state;
    }
};

//videoList
const initialVideoLists = {

    lobbyRec: {
        isFetching: false,
        disInvalidate: false,
        lastUpdated: 0,
        scrollable: false,
        scrollPage: 0,
        items: []
    },
    lobbyAll: {
        isFetching: false,
        disInvalidate: false,
        lastUpdated: 0,
        scrollable: false,
        scrollPage: 0,
        items: []
    },
    all: {
        isFetching: false,
        disInvalidate: false,
        lastUpdated: 0,
        scrollable: true,
        scrollPage: 0,
        items: []
    },
    rec: {
        isFetching: false,
        disInvalidate: false,
        lastUpdated: 0,
        scrollable: true,
        scrollPage: 0,
        items: []
    },
    following: {
        isFetching: false,
        disInvalidate: false,
        lastUpdated: 0,
        scrollable: false,
        scrollPage: 0,
        items: []
    }

}

const videoLists = (state = initialVideoLists, action) => {
    switch (action.type) {

        case UPDATE_VIDEO_LISTS:
            return deepAssign({}, state, {
                [action.subreddit]: {
                    items: action.videoLists,
                }
            });
        
        case UPDATE_VIDEO_SCROLL_PAGE:
            return deepAssign({}, state, {
                [action.subreddit]: {
                    scrollPage: action.scrollPage
                }
            });

        case UPDATE_VIDEO_SCROLLABLE:
            return deepAssign({}, state, {
                [action.subreddit]: {
                    scrollable: action.isScrollable
                }
            });
        default:
            return state;
    }
};

/**
 * 用户信息
 */
const initUser = {
    userInfo: {},
};
const user = (state = initUser, action)=> {
    switch (action.type) {
        case UPDATE_USER_INFO:
            return Object.assign({}, state.userInfo, action.userInfo);
        default:
            return state;
    }
};

/**
 * rank页面 slide index
 * params: dropDownValue: 下拉菜单值 0主播，1用户
 **/
const initialRank = {
    dropDownValue: 0,
    slideIndex: 0,
    anchorLists: {
        rank_rich_day: [],
        rank_rich_week: [],
        rank_rich_month: [],
        rank_rich_his: [],
        rank_exp_day: [],
        rank_exp_week: [],
        rank_exp_month: [],
        rank_exp_his: [],
    }
}

const rank = (state = initialRank, action) => {
    switch (action.type) {

        case SWITCH_RANK_TAB_INDEX:
            return Object.assign({}, state, {
                slideIndex: action.slideIndex
            });

        case CHANGE_RANK_DROPDOWN_VALUE:
            return Object.assign({}, state, {
                dropDownValue: action.dropDownValue
            });

        case UPDATE_RANK_ANCHOR_LISTS:
            return Object.assign({}, state, {
                anchorLists: action.anchorLists
            });

        default:
            return state;
    }
}

/**
 * 搜索
 */
const searchVideos = (state = {videos: []}, action) => {
    switch (action.type) {
        case SEARCH_VIDEO:
            return action;
        default:
            return state;
    }
}

/**
 * 活动
 */
const initActivity = {
    lists: [],
    detailLists: []
}

const activity = (state = initActivity, action) => {
    switch (action.type) {
        case UPDATE_ACTIVITY_LISTS:
            return {
                lists: action.lists
            };
        case UPDATE_ACTIVITY_DETAILS:
            return Object.assign({}, state, {
                detailLists: action.detailLists
            });
        default:
            return state;
    }
}

/**
 * 常量本地
 */
// const initInstances = {
//     PIC_PATH: 'http://s.wuled.com/public',
//     AVATAR_PATH: 'http://10.1.100.194:4869/',
//     RANK_PATH: 'http://10.1.100.102',
// }

/**
 * 常量联调环境
 */
// const initInstances = {
//     PIC_PATH: 'http://10.1.100.102/public',
//     AVATAR_PATH: 'http://10.1.100.194:4869/',
//     RANK_PATH: 'http://10.1.100.102',
// }

/**
 * 常量测试环境
 */
const initInstances = {
    PIC_PATH: 'http://10.1.100.67/public',
    AVATAR_PATH: 'http://10.1.100.194:4869/',
    RANK_PATH: 'http://10.1.100.69',
}

/**
 * 常量bar环境
 */
// const initInstances = {
//     PIC_PATH: 'http://50.117.12.17/public',
//     AVATAR_PATH: 'http://50.117.12.17:4869/',
//     RANK_PATH: 'http://50.117.12.17',
// }

const instances = (state = initInstances, action) => {
    return state;
}

/**
 * 提示框
 */
const initSnackbar = {
    open: false,
    action: '撤销',
    message: '',
    autoHideDuration: 2000,
};

const snackbar = (state = initSnackbar, action) => {
    switch (action.type) {
        case UPDATE_SNACKBAR:
            return Object.assign({},state,action.snackbar);
        default:
            return state;
    }
}

const videos = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_VIDEOS:
            return Object.assign({},state,action.videos);
        default:
            return state;
    }
};

const reducers = combineReducers({
    instances, //常量
    messages,
    lastAction,
    drawerState,
    gift,
    home,
    videoLists,
    videos,
    user,
    rank,
    activity,
    searchVideos,
    snackbar,
});

/**
 * reducer组件
 **/
export default reducers;
