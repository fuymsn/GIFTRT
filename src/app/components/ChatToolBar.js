import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//tool bar
import {Toolbar, ToolbarSeparator, ToolbarGroup} from 'material-ui/Toolbar';

//redux
import { connect } from 'react-redux';
import { postMessage, receiveMessage } from '../actions';

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

let ChatToolBar = ({ dispatch }) => {

  let input;

  return (
    <Toolbar style={style.toolBar}>
      <ToolbarGroup style={style.toolBarGroup}>
        <TextField hintText="输入消息" fullWidth={true} ref={node => { input = node.input }}/>
        <ToolbarSeparator />
        <RaisedButton label="发送" primary={true} style={style.sendBotton} onClick={(e)=>{
          e.preventDefault();
          if(!input.value.trim()) {
            return;
          }

          dispatch(postMessage(input.value));
          input.value = '';
        }}/>
      </ToolbarGroup>
    </Toolbar>
  );

}

ChatToolBar = connect()(ChatToolBar);

export default ChatToolBar;
