import React from 'react';

//聊天窗口头部
import BackAppBar from '../components/BackAppBar';
import VideoPlayer from '../components/VideoPlayer';

//聊天
import Chat from '../components/Chat';

//样式
const styles = {
  container: {
    //textAlign: 'center',
    //paddingTop: 200,
    flexDirection: "column",
    position: "relative",
    display: "flex",
    height: "100%"
  },
};

const Video = () => (
    <div style={styles.container}>
      <BackAppBar />
      <VideoPlayer />
      <Chat />
    </div>
);

export default Video;
