/**
 * ACTION 类型
 */
export const ADD_CHAT_ITEM_RIGHT = 'ADD_CHAT_ITEM_RIGHT';
export const UPDATE_CHAT_ITEM_LEFT = 'UPDATE_CHAT_ITEM_LEFT';

//chat item 随机id
let nextChatId = 0;

/**
 * action 创建函数
 */
export const addChatItemRight = (text) => {
    return { 
        type: ADD_CHAT_ITEM_RIGHT,
        id: nextChatId++,
        text 
    }
}

export const updateChatItemLeft = (text) => {
    return {
        type: UPDATE_CHAT_ITEM_LEFT,
        text
    }
}