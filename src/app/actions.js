/**
 * ACTION 类型
 */
export const ADD_CHAT_ITEM_RIGHT = 'ADD_CHAT_ITEM_RIGHT';
export const UPDATE_CHAT_ITEM_LEFT = 'UPDATE_CHAT_ITEM_LEFT';

/**
 * action 创建函数
 */
export const addChatItemRight = (text) => {
    return { 
        type: ADD_CHAT_ITEM_RIGHT,
        text 
    }
}

export const updateChatItemLeft = (text) => {
    return {
        type: UPDATE_CHAT_ITEM_LEFT,
        text
    }
}