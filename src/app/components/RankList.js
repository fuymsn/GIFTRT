import React, { Component } from 'react';
import {connect} from "react-redux";
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {yellow500, grey300, brown300, transparent} from 'material-ui/styles/colors';
import LevelRich from './LevelRich';
import Diamond from './Diamond';

const style = {
    listItem: {
        root: {
            position: 'relative',
            borderBottom: '1px solid #ddd',
            userSelect: 'none',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            transform: 'translate(0px, 0px)'
        },
        left: {
            position: 'absolute',
            left: '19px',
            top: '50%',
            marginTop: '-12px'
        },
        center: {
            padding: '20px 0px 16px 60px',
            display: 'inline-flex',
            alignItems: 'center'
        },
        avatar: {

        },
        info: {
            position: 'relative',
            margin: '0px 0px 0px 10px'
        },
        infoTop: {
            fontSize: '16px',
            lineHeight: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            margin: '0px 0px 3px 0px'
        },
        name: {
            margin: '0px 10px 0px 0px'
        },
        anchorExpLevel:{
            margin: '0px 5px 0px 0px',
            fontWeight: 'bold',
            color: '#999',
            fontSize: '14px'
        },
        diamondText: {
            color: '#aaa',
            fontSize: '14px'
        }
    }
}


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
            <div>
            {anchorList.map(( anchor, index ) => (
                <div style={ style.listItem.root } key={index} className='rank-list-item'>
                    <div style={style.listItem.left }>{ this.setAnchorRankIcon(index) }</div>
                    <div style={style.listItem.center}>
                        <Avatar src={ avatarPath + anchor.headimg } style={ style.listItem.avatar }/>
                        <div style={ style.listItem.info }>
                            <div style={ style.listItem.infoTop}>
                                <div style={ style.listItem.name }>{ anchor.username }</div>
                                <div style={ style.listItem.anchorExpLevel }>LV.{ anchor.lv_exp }</div>
                                { anchor.vip == "0" ? "": <LevelRich level={ anchor.vip }/> }
                                <LevelRich level={ anchor.lv_rich }/>
                            </div>
                            <div style={ style.listItem.infoButtom}>
                                收礼数：<Diamond value={ anchor.score } textStyle={ style.listItem.diamondText } />
                            </div>
                        </div>
                    </div>
                    <div style={style.listItem.right}></div>
                </div>
            ))}
            </div>
        );
    }

}

export default connect(mapStateToProps, null)(RankList);