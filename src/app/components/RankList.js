import React, { Component } from 'react';
import {connect} from "react-redux";
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {yellow500, grey300, brown300, transparent} from 'material-ui/styles/colors';

function mapStateToProps(state){
    return {
        avatarPath: state.instances.AVATAR_PATH
    }
}

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

        let { anchorList, avatarPath } = this.props;

        return (
            <List className='padding0'>
                {anchorList.map(( anchor, index ) => (
                    <div key={index} >
                        <ListItem
                            primaryText={ anchor.username }
                            secondaryText={ anchor.description }
                            leftIcon={ this.setAnchorRankIcon(index) }
                            rightAvatar={<Avatar src={ avatarPath + anchor.headimg } />}
                            insetChildren={ this.setAnchorRankLayout(index) }
                        />
                        <Divider />
                    </div>
                ))}

            </List>
        );
    }

}

export default connect(mapStateToProps, null)(RankList);