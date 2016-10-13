import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {white} from "material-ui/styles/colors";
import { RaisedButton, IconButton } from "material-ui";

import LevelRich from "../components/LevelRich";
import Diamond from "../components/Diamond";
import Title from "../components/Title";
import * as ChatActions from "../actions";
import VideoList from "../components/VideoList";
import Icon from "../components/Icon";
import Snackbar from "material-ui/Snackbar";
//聊天窗口头部
//actions
//样式
const style = {
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    followingList: {
        //textAlign: 'center',
        //paddingTop: 200,
        paddingLeft: "10px",
        paddingRight: "10px",
        flex: 1,
        display: "flex",
        flexDirection: 'column'
    },

    checkbox: {
        marginTop: "20px"
    },

    setting: {
        position: "absolute",
        left: "0px"
    },

    edit: {
        position: "absolute",
        right: "0px"
    }
};

function mapStateToProps(state) {
    return {
        isConnected: state.messages.status,
        userInfo: state.user.userInfo,
        following: state.videoLists.following,
        snackbar: state.snackbar,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ChatActions, dispatch)
    }
}

//主题
class User extends Component {
    componentDidMount() {

        this.loadUserInfoFromServer();
        if (Object.keys(this.props.following).length==0) {
            this.loadUserFollowingFromServer();
        }

    }

    handleEdit() {
        location.href = '#/user/edit';
    }

    handleSetting(e) {
		//阻止默认事件
        e.preventDefault();
		//数据重组
        var json = JSON.stringify({
			dir: 'activity',
			title: '设置',
			url: '#/setting'
		});

		//执行跳转
        window.mobileAction.switchPage(json);
    }

    handleSnackbarRequestClose(){
        this.props.actions.updateSnackbar({open:false});
    }

    render() {
        let {userInfo, snackbar}=this.props;
        return (
            <div style={ style.container }>
                <div className="user-info">
                    <IconButton
                        style={ style.setting }
                        onTouchTap={ (e) => this.handleSetting(e) }
                    >
                        <Icon icon="setting"/>
                    </IconButton>
                    {/*<IconButton
                        style={ style.edit }
                        onTouchTap={ () => this.handleEdit() }
                    >
                        <Icon icon="edit"/>
                    </IconButton>*/}
                    <div className="user-info_center">
                        <div className="user-info_avatar_wrapper">
                            <div style={{backgroundImage: "url(" + userInfo.headimg + ")"}}
                                 className="user-info_avatar"></div>
                            <div className="user-info_avatar_level">LV {userInfo.lv_exp}</div>
                        </div>

                        <div className="user-info_name_wrapper">
                            <div className="user-info_name">{userInfo.nickname}</div>
                            <LevelRich level={userInfo.lv_rich}/>
                        </div>
                        <div className="user-info_points">
                            <div className="user-info_points_text">余额</div>
                            <Diamond value={userInfo.points}/>
                        </div>
                    </div>
                </div>

                <div style={ style.followingList }>
                    <Title title="我的关注"/>
                    <VideoList key={'following'} listType={ 'following' }/>
                </div>
                <Snackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    autoHideDuration={snackbar.autoHideDuration}
                    //onActionTouchTap={this.handleActionTouchTap}
                    onRequestClose={this.handleSnackbarRequestClose.bind(this)}
                />
            </div>
        );
    }

    loadUserInfoFromServer() {
        this.props.actions.fetchUserInfo();
    }

    loadUserFollowingFromServer() {
        this.props.actions.fetchUserFollowing();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
