import React, { PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';

import { connect } from 'react-redux';
// chat item
import ChatListItem from './ChatListItem';

const style = {
    divider:{
        marginLeft: '66px'
    }
}

const getChats = (chatLists, filter) => {
  switch(filter) {
    case 'SHOW_ALL':
      return chatLists;
  }
}

const mapStateToProps = (state) => {
  return {
    chatLists: getChats(state.chatLists, state.visibilityFilter)
  }
}

let ChatList = ({ chatLists }) => (
  <List>
    {chatLists.map((item, index) =>
      <div key={index}>
        <ChatListItem 
          {...item}
        />
        <Divider inset={true} style={style.divider}/>
      </div>
    )}
  </List>
)

ChatList.propTypes = {
  chatLists: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
}

ChatList = connect(mapStateToProps)(ChatList);

export default ChatList;