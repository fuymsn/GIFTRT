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

export const HOME_TAB_INDEX = 'HOME_TAB_INDEX';
export const RANK_TAB_INDEX = 'RANK_TAB_INDEX';

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

//home tabs index
export const setHomeTabIndex = (index) => {
    return {
        type: HOME_TAB_INDEX,
        slideIndex: index
    }
}

//rank tabs index
export const setRankTabIndex = (index) => {
    return {
        type: RANK_TAB_INDEX,
        slideIndex: index
    }
}