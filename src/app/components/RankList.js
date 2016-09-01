import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {yellow500, grey300, brown300, transparent} from 'material-ui/styles/colors';


class RankList extends Component {

    /**
     * 设置排行榜图标
     */
    setAnchorRankIcon(index) {
        switch(index) {
            case 0:
                return <ActionGrade color={ yellow500 } />;
            case 1:
                return <ActionGrade color={ grey300 } />;
            case 2:
                return <ActionGrade color={ brown300 } />;
            default:
                return;
        }
    }

    /**
     * 设置排行榜布局
     */
    setAnchorRankLayout(index) {
        return index > 2 ? true : false;
    }

    render() {

        let { anchorLists } = this.props;

        return (
            <List className='padding0'>

                {anchorLists.map(( anchor, index ) => (
                    <div key={index} >
                        <ListItem
                            primaryText={ anchor.name }
                            secondaryText={ anchor.info }
                            leftIcon={ this.setAnchorRankIcon(index) }
                            rightAvatar={<Avatar src={ anchor.avatar } />}
                            insetChildren={ this.setAnchorRankLayout(index) }
                        />
                        <Divider />
                    </div>
                ))}

            </List>
        );
    }

}

export default RankList;