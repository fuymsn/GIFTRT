import React from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//聊天窗口头部
import ChatAppBar from './components/AppBar';
//聊天输入
import ChatToolBar from './components/ChatToolBar';
//聊天内容列表
import ChatList from './components/ChatList';

//样式
const styles = {
  container: {
    //textAlign: 'center',
    //paddingTop: 200,
  },
};

//主题
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const Main = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div style={styles.container}>
      <ChatAppBar />
      <ChatList />
      <ChatToolBar />
    </div>
  </MuiThemeProvider>
);

export default Main;
