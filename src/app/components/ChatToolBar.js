import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//tool bar
import {Toolbar, ToolbarSeparator, ToolbarGroup} from 'material-ui/Toolbar';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ChatActions from '../actions';

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

// const mapStateToProps = (state) => {
//   return {
//     messages: state.messages,
//     isConnect: state.messages.status
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    //注入dispatch 方法
    //dispatch,
    actions: bindActionCreators(ChatActions, dispatch)
  }
}

class ChatToolBar extends React.Component {
  handlePost(e) {

    //let dispatch = this.props.dispatch;

    e.preventDefault();
    const chatInput = this.refs.chatInput.input;
    
    let text = chatInput.value.trim();

    if(!text) {
      return;
    }

    this.props.actions.postMessage(text);
    //dispatch(ChatActions.postMessage(chatInput.value));
    chatInput.value = '';

  }

  render() {
    return (
      <Toolbar style={style.toolBar}>
        <ToolbarGroup style={style.toolBarGroup}>
          <TextField hintText="输入消息" fullWidth={true} ref="chatInput"/>
          <ToolbarSeparator />
          <RaisedButton label="发送" primary={true} style={style.sendBotton} onClick={(e)=> this.handlePost(e)}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default connect(null, mapDispatchToProps)(ChatToolBar);
