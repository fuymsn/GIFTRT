import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarSeparator, ToolbarGroup} from 'material-ui/Toolbar';

const style = {
    toolBar: {
        position: "fixed",
        bottom: "0px",
        width: "100%"
    },

    toolBarGroup: {
        width: "100%"
    },

    sendBotton: {
      marginRight: "0px",
      //float: "right"
    }
}

export default class ChatToolBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  render() {
    return (
      <Toolbar style={style.toolBar}>
        <ToolbarGroup style={style.toolBarGroup}>
          <TextField hintText="输入消息" fullWidth={true}/>
          <ToolbarSeparator />
          <RaisedButton label="发送" primary={true} style={style.sendBotton}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}