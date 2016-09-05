/**
 * ACTION 描述数据改变（描述了有事件发生）
 */

//chat item 随机id
let nextChatId = 0;

//websocket 消息收发
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const POST_MESSAGE = 'POST_MESSAGE';
export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';

export const DRAWER_TOGGLE = 'DRAWER_TOGGLE';
export const DRAWER_CLOSE = 'DRAWER_CLOSE';

export const GIFT_DIALOG_OPEN = 'GIFT_DIALOG_OPEN';
export const GIFT_DIALOG_CLOSE = 'GIFT_DIALOG_CLOSE';
export const UPDATE_GIFT_LIST = 'UPDATE_GIFT_LIST';

export const SWITCH_HOME_TAB_INDEX = 'SWITCH_HOME_TAB_INDEX';
export const UPDATE_HOME_VIDEO_LISTS = 'UPDATE_HOME_VIDEO_LISTS';

export const SWITCH_RANK_TAB_INDEX = 'SWITCH_RANK_TAB_INDEX';
export const UPDATE_RANK_ANCHOR_LISTS = 'UPDATE_RANK_ANCHOR_LISTS';

export const SEARCH_VIDEO = 'SEARCH_VIDEO';

export const UPDATE_ACTIVITY_LISTS = 'UPDATE_ACTIVITY_LISTS';

//连接
export const connect = () => {
    return {
        type: CONNECT
    }
}
//断开连接
export const disconnect = () => {
    return {
        type: DISCONNECT
    }
}
//收
export const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        id: nextChatId++,
        message
    }
}

//发
export const postMessage = (text) => {
    return {
        type: POST_MESSAGE,
        id: nextChatId++,
        text
    }
}

//drawer toggle
export const drawerToggle = (isOpen) => {
    return {
        type: DRAWER_TOGGLE,
        //反转
        open: isOpen
    }
}

//drawer close
export const drawerClose = () => {
    return {
        type: DRAWER_CLOSE,
        open: false
    }
}

//gift dialog open
export const openGiftDialog = () => {
    return {
        type: GIFT_DIALOG_OPEN,
        open: true
    }
}
//gift dialog close
export const closeGiftDialog = () => {
    return {
        type: GIFT_DIALOG_CLOSE,
        open: false
    }
}
//gift update list
export const updateGiftList = (giftList) => {
    return {
        type: UPDATE_GIFT_LIST,
        giftList
    }
}


//home tabs index
export const setHomeTabIndex = (slideIndex) => {
    return {
        type: SWITCH_HOME_TAB_INDEX,
        slideIndex
    }
}

//home video lists
export const updateHomeVideoLists = (slideIndex) => {
    return {
        type: UPDATE_HOME_VIDEO_LISTS,
        slideIndex
    }
}

//rank tabs index
export const setRankTabIndex = (slideIndex) => {
    return {
        type: SWITCH_RANK_TAB_INDEX,
        slideIndex
    }
}

export const updateRankAnchorLists = (anchorLists) => {
    return {
        type: UPDATE_RANK_ANCHOR_LISTS,
        anchorLists
    }
}

//search
export const searchVideos = (videos) => {
    return {
        type: SEARCH_VIDEO,
        videos
    }
}

export const updateActivityLists = (activityList) => {
    return {
        type: UPDATE_ACTIVITY_LISTS,
        activityList
    }
}