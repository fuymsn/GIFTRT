import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";
import {bindActionCreators} from "redux";
import Common from "../utils/Common";
import MobileAction from "../utils/MobileAction";
import VideoCover from "./VideoCover";
import FollowNum from "./FollowNum";
import Icon from "./Icon";
import objectAssign from "object-assign";
Object.assign = objectAssign;

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
            backgroundImage: 'url(./images/live-status-on.png)',
        },

        iconStatusOff: {
            backgroundImage: 'url(./images/live-status-off.png)',
        },

        iconInfo: {
            display: 'flex',
            flexDirection: 'row-reverse'
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
        slideIndex: state.home.slideIndex,
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
        
        if(data.liveStatus){

            //如果在线
            if(!this.touched){
                let id = data.id;
                let json = JSON.stringify({
                    dir: 'room',
                    roomId: id
                });
                MobileAction.switchPage(json);
                this.touched = true;
                
                //过500毫秒 再变为false，防止双击屏幕的情况
                setTimeout(() => {
                    this.touched = false;
                }, 500);
            }

        }else{
            //如果不在线
            let json = JSON.stringify({
                title: '提示',
                content: '主播还没有开播哟\n请选择已经在播的主播观看吧！'
            });
            MobileAction.showToastDialog(json);
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
        return /\d{13}/.test(imageID) ? (instances.CDN_PATH + "/public/images/anchorimg/" + userID + "_" + imageID.match(/\d{13}/)[0] + ".jpg") : instances.CDN_PATH + '/public/images/vzhubo.jpg';
    }

    //会引起无限循环，以后修改
    // componentWillUpdate(){
    //     let { slideIndex } = this.props;
    //     switch(slideIndex){
    //         case 1:
    //             this.props.actions.updateScrollable('rec', true);
    //             return true;
    //         case 2:
    //             this.props.actions.updateScrollable('all', true);
    //             return true;
    //     }
    // }

    //tid == 2 为密码房间, tid == 4 预约房间
    render() {

        let { videoLists, listType, videos } = this.props;
        let videoList = videoLists[listType];
        //videoList 的滚动量
        let scrollPageSize = this.pageSize + videoList.scrollPage * this.pageSize;

        //videoList 的current数量
        let currentPageSize = scrollPageSize >= videoList.items.length? videoList.items.length: scrollPageSize; 

        //videoList 的数量
        let pageSize = videoList.items.length < 10 ? videoList.items.length: currentPageSize;

        if(videoList.items.length > 0){
            for(;this.pageNum < pageSize; this.pageNum++){
                this.tmpVideoList.push(videoList.items[this.pageNum]);
            }
        }

        // if(listType == 'rec' || listType == 'all'){
        //     this.props.actions.updateScrollable(listType, true);
        // }
        
        return (
            <div style={style.root}>
                { this.tmpVideoList.map((uid)=> {
                    let tile = videos[uid];
                    //排除空对象
                    if(!tile) { return false; };
                    //直播状态
                    let liveStatusStyle = tile.live_status == 0 ? Object.assign({}, style.video.iconStatus, style.video.iconStatusOff) : Object.assign({}, style.video.iconStatus, style.video.iconStatusOn);
                    //直播列表
                    return (

                        <div style={ style.video.root } key={tile.uid} onTouchTap={ (e) => {
                                this.handleVideoTap(e, { id: tile.uid, liveStatus: tile.live_status })
                            }}>
                            <div style={ style.video.rootInner }>
                                <div style={ style.video.main }>
                                    <VideoCover
                                        style={ style.video.cover }
                                        backgroundUrl={ this.getVideoImageUrl(tile.uid, tile.headimg) }
                                        children={
                                            <div style={ style.video.coverContainer}>
                                                <div style={ liveStatusStyle }></div>
                                                <div style={ style.video.iconInfo }>
                                                    {/* 密码房间 */}
                                                    { tile.tid == 2 && <Icon type='room' icon='room-secret' /> }
                                                    {/* 限制房间 */}
                                                    { tile.enterRoomlimit == 1 && <Icon type='room' icon='room-limited' />}
                                                    {/* 一对一房间 */}
                                                    { tile.tid == 4 && <Icon type='room' icon='room-1v1' />}
                                                </div>
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