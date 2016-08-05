import React from 'react';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import {
blue300,
indigo900,
orange200,
deepOrange300,
pink400,
purple500,
} from 'material-ui/styles/colors';

const style = {
    avatar: {
        top: '10px'
    },
    listItem: {
        paddingTop: '18px',
        // paddingBottom: '10px',
        paddingLeft: '66px'
    },

    secondaryText:{
        overflow: 'initial',
        textOverflow: 'initial',
        whiteSpace: 'normal',
        height: 'auto',
        marginTop: '0px',
    },
};

/**
 * Examples of `Avatar` using an image, [Font Icon](/#/components/font-icon), [SVG Icon](/#/components/svg-icon)
 * and "Letter" (string), with and without custom colors at the default size (`40dp`) and an alternate size (`30dp`).
 */
const ChatListItemLeft = () => (
    <ListItem
      disabled={true}
      style={ style.listItem }
      leftAvatar={
        <Avatar
          color={deepOrange300}
          backgroundColor={purple500}
          size={30}
          style={style.avatar}
        >
          L
        </Avatar>
      }
      secondaryText={
          <p style={style.secondaryText}>I'll be in your neighborhood doing errands this weekend. Do you want, I'll be in your neighborhood doing errands this weekend. Do you want </p>
      }
    >
    </ListItem>
);

export default ChatListItemLeft;