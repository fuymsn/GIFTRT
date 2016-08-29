import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ChatActions from '../actions';
// chat item
import ChatListItem from './ChatListItem';

const styles = {

    chatList: {
        overflowY: 'scroll',
        flex: 1
    },

    divider:{
        marginLeft: '66px'
    }
}

//chatLists 数据，filter 状态
const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    isConnect: state.messages.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ChatActions, dispatch)
  }
}

class ChatList extends Component {

  render() {

    const { messages } = this.props;

    return (
        <List style={ styles.chatList }>
        {
          messages.conversation.map((item, index) =>
            <div key={index}>
              <ChatListItem 
                {...item}
              />
              <Divider inset={true} style={styles.divider}/>
            </div>
          )
        }
        </List>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);