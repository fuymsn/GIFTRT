import React, { PropTypes } from 'react';
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
    secondaryTextRight: {
        overflow: 'initial',
        textOverflow: 'initial',
        whiteSpace: 'normal',
        height: 'auto',
        marginTop: '0px',
        textAlign: "right"
    }
};

/**
 * Examples of `Avatar` using an image, [Font Icon](/#/components/font-icon), [SVG Icon](/#/components/svg-icon)
 * and "Letter" (string), with and without custom colors at the default size (`40dp`) and an alternate size (`30dp`).
 */
const ChatListItemRight = ({ text }) => (
    <ListItem
        disabled={true}
        style={ style.listItem }
        rightAvatar={
        <Avatar
            color={deepOrange300}
            backgroundColor={purple500}
            size={30}
            style={style.avatar}
        >
            Y
        </Avatar>
        }
        secondaryText={
            <p style={style.secondaryTextRight}>{text}</p>
        }
    >
    </ListItem>
);

ChatListItemRight.propTypes = {
    text: PropTypes.string.isRequired
}

export default ChatListItemRight;