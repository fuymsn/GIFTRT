import React, { Component } from 'react';

const styles = {
    videoPlayer: {
        flex: 1,
        height: "240px",
        overflow: "hidden",
        position: "relative"
    },
    
    videoImage: {
        flex: 1,
        height: "auto",
        width: "100%",
        position: "relative",
        transform: "translateY(-50%)",
        top: "50%",
        left: "0px"
    }
}

class VideoPlayer extends Component{
    
    render() {
        return (
            <div style={ styles.videoPlayer } data-src="http://hls.wspull.bn.netease.com/pushstation/49078526/playlist.m3u8">
                <img style={ styles.videoImage } src="http://bobo-public.nosdn.127.net/anchor_1472109586899_58602517.jpg" />
            </div>
        )
    }

}

export default VideoPlayer;