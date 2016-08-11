/**
 * ACTION 类型
 */

//chat item 随机id
let nextChatId = 0;

//websocket 消息收发
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const POST_MESSAGE = 'POST_MESSAGE';
export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';

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

