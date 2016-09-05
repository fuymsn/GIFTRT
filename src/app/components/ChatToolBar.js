import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

//tool bar
import {Toolbar, ToolbarSeparator, ToolbarGroup} from 'material-ui/Toolbar';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GiftList from './GiftList';

import * as ChatActions from '../actions';

const style = {
    toolBar: {
        // position: "fixed",
        // bottom: "0px",
        // width: "100%"
    },

    toolBarGroup: {
        width: "100%"
    },

    sendBotton: {
      marginRight: "0px",
      //float: "right"
    }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    isConnect: state.messages.status,
    giftDialogState: state.gift.dialogState,
    giftList: state.gift.giftList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //注入dispatch 方法
    //dispatch,
    actions: bindActionCreators(ChatActions, dispatch)
  }
}

class ChatToolBar extends Component {

  handleDialogOpen() {
    this.props.actions.openGiftDialog();
  }

  handleDialogClose() {
    this.props.actions.closeGiftDialog();
  }

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

    const { giftDialogState, giftList } = this.props;

    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={ (e) => { this.handleDialogClose(e) } }
      />
    ];

    return (
      <div style={style.toolBar}>
        <Toolbar>
          <ToolbarGroup>
            <TextField hintText="输入消息" ref="chatInput" fullWidth={true}/>
          </ToolbarGroup>
          <ToolbarGroup>
            <FontIcon className="material-icons" onTouchTap={ (e) => { this.handleDialogOpen(e) } }>redeem</FontIcon>
            <ToolbarSeparator />
            <RaisedButton label="发送" primary={true} style={style.sendBotton} onClick={(e)=> this.handlePost(e)}/>
          </ToolbarGroup>
        </Toolbar>
        <Dialog
          title="礼物"
          actions={actions}
          modal={false}
          open={ giftDialogState }
          onRequestClose={ (e) => { this.handleDialogClose(e); } }
          autoScrollBodyContent={true}
        >
          <GiftList giftList={ giftList }/>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatToolBar);
