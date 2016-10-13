import React, {Component} from "react";
import {connect} from "react-redux";
import {GridList, GridTile} from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import Star from "material-ui/svg-icons/toggle/star";
import StarBorder from "material-ui/svg-icons/toggle/star-border";
import * as actions from "../actions";
import {bindActionCreators} from "redux";

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        //height: 500,
        overflowY: 'auto',
        marginBottom: 5,
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

    handleVideoTap(e, data) {
        let id = data.id;
        //location.href = '#/video/' + id;
        console.log(id);
        e.preventDefault();
        var json = JSON.stringify({
            dir: 'room',
            roomId: id
        });
        window.mobileAction.switchPage(json);
    }

    handleToggleFollow(e, uid, tile) {
        e.stopPropagation();
        let ret = tile.following ? 2 : 1;
        this.props.actions.toggleFollow(uid, ret, tile);
    }

    //设置视频背景图片
    getVideoImageUrl(userID, imageID) {
        let {instances} = this.props;
        return /\d{13}/.test(imageID) ? (instances.PIC_PATH + "/images/anchorimg/" + userID + "_" + imageID.match(/\d{13}/)[0] + ".jpg") : instances.PIC_PATH + '/images/vzhubo.jpg'
    }

    render() {

        let {videoLists, listType, videos} = this.props;
        let videoList = videoLists[listType];
        let _videoList = [];
        videoList.map((uid)=> {
            let tile = videos[uid];
            _videoList.push(
                <GridTile
                    key={tile.uid}
                    title={tile.username}
                    subtitle={<span><b>{tile.live_time}</b></span>}
                    onTouchTap={ (e) => {
                        this.handleVideoTap(e, {id: tile.uid})
                    }}
                    actionIcon={
                        <IconButton
                            onTouchTap={
                                (e)=> {
                                    this.handleToggleFollow(e, tile.uid, tile)
                                }
                            }
                        >
                            {tile.following ? <Star color="#FFC107"/> : <StarBorder color="white"/>}
                        </IconButton>}
                >
                    <img src={ this.getVideoImageUrl(tile.uid, tile.headimg)}/>
                </GridTile>
            )
        });
        // for(let uid in videoList){
        //     let tile=videoList[uid];
        //     _videoList.push(
        //         <GridTile
        //             key={tile.uid}
        //             title={tile.username}
        //             subtitle={<span><b>{tile.live_time}</b></span>}
        //             onTouchTap={ (e) => {
        //                 this.handleVideoTap(e, {id: tile.uid})
        //             }}
        //             actionIcon={
        //                 <IconButton
        //                     onTouchTap={
        //                         (e)=> {
        //                             this.handleToggleFollow(e, tile.uid, tile)
        //                         }
        //                     }
        //                 >
        //                     {tile.following ? <Star color="#FFC107"/> : <StarBorder color="white"/>}
        //                 </IconButton>}
        //         >
        //             <img src={ this.getVideoImageUrl(tile.uid, tile.headimg)}/>
        //         </GridTile>
        //     )
        // }
        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={150}
                    style={styles.gridList}
                >
                    {_videoList}
                </GridList>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);