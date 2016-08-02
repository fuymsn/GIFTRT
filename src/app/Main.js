import React, {Component} from 'react';

import { RaisedButton } from 'material-ui';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//聊天窗口头部
import ChatAppBar from './AppBar.js';
//聊天输入
import ChatToolBar from './ToolBar.js';
//聊天内容列表
import ChatList from './ChatList.js';

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

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      //open: false,
    };
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <ChatAppBar />
          <ChatList />
          <ChatToolBar />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
