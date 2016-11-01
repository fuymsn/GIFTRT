import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";
import {bindActionCreators} from "redux";
import Common from "../utils/Common";
import MobileAction from "../utils/MobileAction";
import VideoCover from "./VideoCover";
import FollowNum from "./FollowNum";

const style = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,        
    },
    gridList: {
        width: 500,
        //height: 500,
        overflowY: 'auto',
        marginBottom: 5,
    },

    video: {
        root: {
            boxSizing: 'border-box',
            padding: '2px',
            width: '50%',
            position: 'relative',
            borderRadius: '3px',
            overflow: 'hidden',
            
        },

        rootInner: {
            boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.3)',
            borderRadius: '3px',
        },

        main: {
            width: '100%',
            height: '145px',
            position: 'relative',
            overflow: 'hidden'
        },

        cover: {
            height: '100%',
            width: '100%',
            borderRadius: '3px'
        },

        coverContainer: {
            height: '100%',
            width: '100%'
        },

        iconStatus: {
            left: '0px',
            position: 'absolute',
            top: '0px',
            width: '51px',
            height: '22px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        },

        iconStatusOn: {
            backgroundImage: 'url(images/live-status-on.png)',
        },

        iconStatusOff: {
            backgroundImage: 'url(images/live-status-off.png)',
        },

        name: {
            width: '100%',
            position: 'absolute',
            bottom: '0px',
            backgroundColor: '#000',
            color: '#fff',
            opacity: '0.4',
            padding: '4px 8px'
        },

        side: {
            padding: '4px 8px',
            backgroundColor: '#fff',
            borderRadius: '0px 0px 3px 3px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },

        followNum: {
            color: '#666'
        },

        expLevel: {
            color: '#666'
        }

    }
};

const mapStateToProps = (state) => {
    return {
        instances: state.instances,
        videoLists: state.videoLists,
        videos: state.videos,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

class VideoList extends Component {

    constructor() {
        super();
        this.touched = false;
        this.pageNum = 0;
        this.pageSize = 10;
        this.tmpVideoList = [];
    }

    //进入直播间
    handleVideoTap(e, data) {

        e.preventDefault();

        // location.href = '#/video/' + id;

        // if(!Common.isLogin()){
        //     MobileAction.showLoginDialog();
        // }else{

        if(!this.touched){
            let id = data.id;
            let json = JSON.stringify({
                dir: 'room',
                roomId: id
            });
            MobileAction.switchPage(json);
            this.touched = true;
        }else{
            //过500毫秒 再变为false
            setTimeout(()=>{
                this.touched = false;
            }, 500);
            
        }
        
    }

    /**
     * 关注主播
     * e: event，uid: 主播id，tile: 主播信息obj
     */
    handleToggleFollow(e, uid, tile) {
        e.stopPropagation();
        let ret = tile.following ? 2 : 1;
        this.props.actions.toggleFollow(uid, ret, tile);
    }

    //设置视频背景图片
    getVideoImageUrl(userID, imageID) {
        let { instances } = this.props;
        return /\d{13}/.test(imageID) ? (instances.PIC_PATH + "/images/anchorimg/" + userID + "_" + imageID.match(/\d{13}/)[0] + ".jpg") : instances.PIC_PATH + '/images/vzhubo.jpg'
    }

    render() {

        let { videoLists, listType, videos } = this.props;
        let videoList = videoLists[listType];
        let pageSize = videoList.length < 10 ? videoList.length: this.pageSize;

        if(videoList.length > 0){
            for(;this.pageNum < pageSize; this.pageNum++){
                this.tmpVideoList.push(videoList[this.pageNum]);
            }
        }

        return (
            <div style={style.root}>
                { this.tmpVideoList.map((uid)=> {
                    let tile = videos[uid];
                    //直播状态
                    let liveStatusStyle = tile.live_status == 0 ? Object.assign({}, style.video.iconStatus, style.video.iconStatusOff) : Object.assign({}, style.video.iconStatus, style.video.iconStatusOn);
                    //直播列表
                    return (

                        <div style={ style.video.root } key={tile.uid} onTouchTap={ (e) => {
                                this.handleVideoTap(e, {id: tile.uid})
                            }}>
                            <div style={ style.video.rootInner }>
                                <div style={ style.video.main }>
                                    <VideoCover
                                        style={ style.video.cover }
                                        backgroundUrl={ this.getVideoImageUrl(tile.uid, tile.headimg) }
                                        children={
                                            <div style={ style.video.coverContainer}>
                                                <div style={ liveStatusStyle }></div>
                                                <div style={ style.video.iconInfo }></div>
                                                <div style={ style.video.coverInfo }></div>
                                            </div>
                                        }
                                    />
                                    <div style={ style.video.name }>{tile.username}</div>
                                </div>
                                <div style={ style.video.side }>
                                    <FollowNum textStyle={ style.video.followNum } value={ tile.attens } />
                                    <div style={ style.video.expLevel }>LV. { tile.lv_exp }</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);