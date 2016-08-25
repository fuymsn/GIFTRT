import React from 'react';

//聊天窗口头部
import BackAppBar from '../components/BackAppBar';
import VideoPlayer from '../components/VideoPlayer';
//聊天输入
import ChatToolBar from '../components/ChatToolBar';
//聊天内容列表
import ChatList from '../components/ChatList';

//样式
const styles = {
  container: {
    //textAlign: 'center',
    //paddingTop: 200,
    flexDirection: "column",
    position: "relative",
    display: "flex"
  },
};

const Video = () => (
    <div style={styles.container}>
      <BackAppBar />
      <VideoPlayer />
      <ChatList />
      <ChatToolBar />
    </div>
);

export default Video;
