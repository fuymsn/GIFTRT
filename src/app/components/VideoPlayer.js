import React, { Component } from 'react';

const styles = {
    videoPlayer: {
        height: "240px",
        overflow: "hidden",
        position: "relative"
    },

    videoPlayerInner: {
        height: '240px',
        zIndex:0,
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
        zIndex: 10
    }
}

class VideoPlayer extends Component{
    
    render() {
        return (
            
            <div style={ styles.videoPlayer }>
                <video id="live" controls style={ styles.videoPlayerInner }>
                    <source src="http://103.12.152.102/v44184064-49756942__18185_hls/playlist.m3u8" type="video/mp4" />
                </video>
                <img style={ styles.videoImage } src="http://bobo-public.nosdn.127.net/anchor_1472109586899_58602517.jpg" />
            </div>
        )
    }

}

export default VideoPlayer;