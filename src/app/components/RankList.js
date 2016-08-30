import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {yellow500, grey300, brown300, transparent} from 'material-ui/styles/colors';


class RankList extends Component {

    render() {
        return (
            <List className='padding0'>
                <ListItem
                    primaryText="水水惹人爱"
                    secondaryText="粉丝：1243214"
                    leftIcon={<ActionGrade color={yellow500} />}
                    rightAvatar={<Avatar src="images/z1.jpg" />}
                />
                <Divider />
                <ListItem
                    primaryText="带刺的玫瑰"
                    secondaryText="粉丝：343214"
                    leftIcon={<ActionGrade color={grey300} />}
                    rightAvatar={<Avatar src="images/z2.jpg" />}
                />
                <Divider />
                <ListItem
                    primaryText="郁金香"
                    secondaryText="粉丝：78324"
                    leftIcon={<ActionGrade color={brown300} />}
                    rightAvatar={<Avatar src="images/z3.jpg" />}
                />
                <Divider />
                <ListItem
                    primaryText="天下第一美人"
                    secondaryText="粉丝：78324"
                    insetChildren={true}
                    rightAvatar={<Avatar src="images/z4.jpg" />}
                />
                <Divider />
                <ListItem
                    primaryText="天下第一美人"
                    secondaryText="粉丝：78324"
                    insetChildren={true}
                    rightAvatar={<Avatar src="images/z5.jpg" />}
                />
                <Divider />
                <ListItem
                    primaryText="天下第一美人"
                    secondaryText="粉丝：78324"
                    insetChildren={true}
                    rightAvatar={<Avatar src="images/z6.jpg" />}
                />
                <Divider />
                <ListItem
                    primaryText="天下第一美人"
                    secondaryText="粉丝：78324"
                    insetChildren={true}
                    rightAvatar={<Avatar src="images/z7.jpg" />}
                />
                <Divider />
                <ListItem
                    primaryText="天下第一美人"
                    secondaryText="粉丝：78324"
                    insetChildren={true}
                    rightAvatar={<Avatar src="images/z8.jpg" />}
                />
                <Divider />
                <ListItem
                    primaryText="天下第一美人"
                    secondaryText="粉丝：78324"
                    insetChildren={true}
                    rightAvatar={<Avatar src="images/z9.jpg" />}
                />
                <Divider />
                <ListItem
                    primaryText="天下第一美人"
                    secondaryText="粉丝：78324"
                    insetChildren={true}
                    rightAvatar={<Avatar src="images/z10.jpg" />}
                />
            </List>
        );
    }

}

export default RankList;