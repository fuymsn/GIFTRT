import React, { Component } from 'react';

const styles = {
    videoPlayer: {
        height: "240px",
        overflow: "hidden",
        position: "relative"
    },

    videoPlayerInner: {
        //height: '240px',
        width: '100%',
        zIndex: 10,
        position: 'absolute',
        top: '0px',
        left: '0px'
    },
    
    videoImage: {
        height: "auto",
        width: "100%",
        position: "relative",
        transform: "translateY(-50%)",
        top: "50%",
        left: "0px",
        zIndex: 0
    }
}

class VideoPlayer extends Component{
    
    render() {
        return (
            
            <div style={ styles.videoPlayer }>
                <video id="live" autoplay controls style={ styles.videoPlayerInner }>
                    <source src="http://hls.wspull.bn.netease.com/pushstation/54053324/playlist.m3u8" type="video/mp4" />
                </video>
                <img style={ styles.videoImage } src="http://imgsize.ph.126.net/?imgurl=http://bobo-public.nosdn.127.net/anchor_1472525211871_49136488.jpg_300x191x1x85.jpg" />
            </div>
        )
    }

}

export default VideoPlayer;