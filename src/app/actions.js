import $ from "./utils/JQuery";
import Video from "./utils/Video";
import Common from "./utils/Common";

/**
 * ACTION 描述数据改变（描述了有事件发生）
 */

//chat item 随机id
let nextChatId = 0;

//websocket 消息收发
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const POST_MESSAGE = 'POST_MESSAGE';
export const SEND_GIFT = 'SEND_GIFT';
export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';

export const DRAWER_TOGGLE = 'DRAWER_TOGGLE';
export const DRAWER_CLOSE = 'DRAWER_CLOSE';

export const GIFT_DIALOG_OPEN = 'GIFT_DIALOG_OPEN';
export const GIFT_DIALOG_CLOSE = 'GIFT_DIALOG_CLOSE';
export const UPDATE_GIFT_LIST = 'UPDATE_GIFT_LIST';

export const SWITCH_HOME_TAB_INDEX = 'SWITCH_HOME_TAB_INDEX';

export const CHANGE_RANK_DROPDOWN_VALUE = 'CHANGE_RANK_DROPDOWN_VALUE';
export const SWITCH_RANK_TAB_INDEX = 'SWITCH_RANK_TAB_INDEX';
export const UPDATE_RANK_ANCHOR_LISTS = 'UPDATE_RANK_ANCHOR_LISTS';

export const SEARCH_VIDEO = 'SEARCH_VIDEO';

export const UPDATE_ACTIVITY_LISTS = 'UPDATE_ACTIVITY_LISTS';
export const UPDATE_ACTIVITY_DETAILS = 'UPDATE_ACTIVITY_DETAILS';

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_USER_TOKEN = 'UPDATE_USER_TOKEN';
export const UPDATE_VIDEO_LISTS = 'UPDATE_VIDEO_LISTS';
export const UPDATE_VIDEOS = 'UPDATE_VIDEOS';
export const UPDATE_SNACKBAR = 'UPDATE_SNACKBAR';

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

//送礼 id为礼物id
export const sendGift = (giftId) => {
    return {
        type: SEND_GIFT,
        id: nextChatId++,
        giftId
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
        dialogIsOpen: true
    }
}
//gift dialog close
export const closeGiftDialog = () => {
    return {
        type: GIFT_DIALOG_CLOSE,
        dialogIsOpen: false
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

export const changeRankDropDownValue = (dropDownValue) => {
    return {
        type: CHANGE_RANK_DROPDOWN_VALUE,
        dropDownValue
    }
}

//search
export const searchVideos = (videos) => {
    return {
        type: SEARCH_VIDEO,
        videos
    }
}

//activity
export const updateActivityLists = (lists) => {
    return {
        type: UPDATE_ACTIVITY_LISTS,
        lists
    }
}

export const updateActivityDetails = (detailLists) => {
    return {
        type: UPDATE_ACTIVITY_DETAILS,
        detailLists
    }
}
export const updateSnackbar = (snackbar) => {
    return {
        type: UPDATE_SNACKBAR,
        snackbar
    }
}

//获取用户信息
export const fetchUserInfo = ()=> {
    return (dispatch)=> {
        return $.ajax({
            url: '/m/user/info',
            dataType: 'json',
            type: 'GET',
            data: {
                '_': (new Date()).getTime(),
            },
            success: function (data) {
                if (!(data.status == 0)) {
                    dispatch(updateUserInfo({userInfo: data}));
                } else {
                    console.log('没有获取到token, /m/user/info没有获取到数据');
                    //dispatch(Common.login());
                }
            },
            error: function (ret) {
                //获取token
                console.log(ret.responseText);
            },
        });
    }
};

export const updateUserInfo = (userInfo)=> {
    return {
        type: UPDATE_USER_INFO,
        userInfo
    }
}

//更新UserToken
export const updateUserToken = (token) => {
    return {
        type: UPDATE_USER_TOKEN,
        token
    }
}

//获取关注列表信息
export const fetchUserFollowing = ()=> {
    return (dispatch, getState)=> {

        return $.ajax({
            url: '/m/user/following',
            dataType: 'json',
            type: 'GET',
            data: {
                '_': (new Date()).getTime(),
            },
            success: function (data) {
                if (!(data.status == 0)) {
                    let _videoLists = {following: []};
                    let _videos={};
                    _videoLists.following=data.map((room)=> {
                        _videos[room.uid] = Object.assign(room, {following: true})
                        return room.uid;
                    });
                    dispatch(updateVideos(_videos));
                    dispatch(updateVideoLists(_videoLists));
                    //更新其他列表
                    const state = getState();
                    // const Video = require('./utils/Video');
                    // _videoLists = Video.initFollowStatusForVideoLists(state.videoLists);
                    // if (_videoLists)
                    //     dispatch(updateVideoLists());
                } else {
                    console.log('没有获取到token，/m/user/following没有获取到数据');
                    //获取token
                    //dispatch(Common.login());
                }
            },
            error: function (ret) {
                console.log(ret.responseText);
            },
        });
    }
}
export const updateVideoLists = (videoLists)=> {
    return {
        type: UPDATE_VIDEO_LISTS,
        videoLists
    }
}
export const updateVideos = (videos)=> {
    return {
        type: UPDATE_VIDEOS,
        videos
    }
}
export const fetchLobby = ()=> {
    return (dispatch)=> {
        return $.ajax({
            url: '/m/index',
            dataType: 'json',
            type: 'GET',
            data: {
                '_': (new Date()).getTime(),
            },
            success: function (data) {
                let _videoLists = {lobby_rec: [], lobby_all: []};
                let _videos={};
                // data.rec.data.forEach((room)=> {
                //     _videoLists.lobby_rec[room.uid] = room
                // });
                // data.all.data.forEach((room)=> {
                //     _videoLists.lobby_all[room.uid] = room
                // });
                _videoLists.lobby_rec=data.rec.data.map((room)=>{
                    _videos[room.uid] = room;
                    return room.uid;
                });
                _videoLists.lobby_all=data.all.data.map((room)=>{
                    _videos[room.uid] = room;
                    return room.uid;
                });
                dispatch(updateVideos(_videos));
                dispatch(updateVideoLists(_videoLists));
            },
            error: function (ret) {
                console.log(ret.responseText);
            }
        });
    }
}
export const fetchVideoList = (type)=> {
    return (dispatch)=> {
        return $.ajax({
            url: '/m/video/list/' + type,
            dataType: 'json',
            type: 'GET',
            data: {
                '_': (new Date()).getTime(),
            },
            success: function (data) {
                let _videos = {};
                // data.rooms.forEach((room)=> {
                //     list[room.uid] = room
                // });
                let idList=data.rooms.map((room)=>{
                    _videos[room.uid] = room;
                    return room.uid;
                });
                dispatch(updateVideos(_videos));
                dispatch(updateVideoLists({[type]: idList}));

            },
            error: function (ret) {
                console.log(ret.responseText);
            }
        });
    }
}
export const toggleFollow = (uid, ret, tile)=> {
    return (dispatch, getState)=> {
        return $.ajax({
            url: '/m/follow',
            dataType: 'json',
            type: 'post',
            data: {
                pid: uid,
                ret: ret,
                '_': (new Date()).getTime(),
            },
            success: function (data) {
                dispatch(updateSnackbar({message:data.msg,open:true}));
                if (data.status == 1) {
                    const state = getState();
                    let _videoLists = Object.assign({}, {following:state.videoLists.following});
                    let _videos = {};
                    // for (let type in _videoLists) {
                    //     if (type == 'following') continue;
                    //     if (_videoLists[type][uid] !== undefined)
                    //         _videoLists[type][uid].following = !_videoLists[type][uid].following;
                    // }
                    if (ret == 1) {//我的关注-添加
                        _videoLists.following.unshift(uid);
                        _videos[uid] = Object.assign({},tile,{following:true});
                    } else if (ret == 2) {
                        //我的关注-删除
                        let index=_videoLists.following.indexOf(uid);
                        if (index!==-1)
                            _videoLists.following.splice(index,1);
                        _videos[uid] = Object.assign({},tile,{following:false});
                    }
                    dispatch(updateVideos(_videos));
                    dispatch(updateVideoLists(_videoLists));

                } else {
                    console.log(data);
                }
            },
            error: function (ret) {
                dispatch(updateSnackbar({message:ret.responseText,open:true}));
                console.log(ret.responseText);
            }
        });
    }
};
export const fetchAnchorRank = ()=> {
    return (dispatch,getState)=> {
        const state=getState();
        return $.ajax({
            url: state.instances.RANK_PATH+'/video_gs/rank/data_ajax',
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "cb",
            success: function (json) {
                if (typeof json === 'object')
                    dispatch(updateRankAnchorLists(json));
            },
            error: function (json) {
                if (console) {
                    console.log("rank data fetch error")
                }
            }
        });
    }
};