import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';

import ActionSearch from 'material-ui/svg-icons/action/search';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';

const style = {
    avatar: {
        padding: 0
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.drawerState.open
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

class VAppBar extends Component {

    handleLinkToSearch(){
        location.href = '#/search';
    }

    handleHome(e) {
        this.handleClose(e);
        location.href = "#/home";
    }

    handleRank(e) {
        this.handleClose(e);
        location.href = "#/rank";
    }

    handleUser(e) {
        this.handleClose(e);
        location.href = "#/user";
    }

    handleLogout(e) {
        this.handleClose(e);
        location.href = "#/login";
    }

    handleToggle(e) {
        this.props.actions.drawerToggle();
    }

    handleClose(e) {
        this.props.actions.drawerClose();
    }

    render() {
        //与上面声明的 mapStateToProps 关联
        const { open } = this.props;

        return(
            <AppBar
                //只有创建class类VAppBar才可以传递参数，普通方法不可传递
                title={ this.props.title ? this.props.title : "标题" }

                iconElementLeft={

                    <IconButton 
                        style = { style.avatar }
                        onTouchTap = { (e) => this.handleToggle(e) }
                        >
                        <Avatar
                            src="images/uxceo-128.jpg"
                            //size={30}
                        />
                    </IconButton>

                }

                //iconClassNameRight="muidocs-icon-navigation-expand-more"
                iconElementRight={
                    <IconButton
                        onTouchTap = { () => this.handleLinkToSearch() }
                    >
                        <ActionSearch />
                    </IconButton>
                }

                className='appBar'

            >
                <Drawer
                    docked={false}
                    width={200}
                    open={ open }
                    onRequestChange={(e) => this.handleClose(e)}
                    >
                    <MenuItem onTouchTap={ (e) => this.handleHome(e) }>大厅</MenuItem>
                    <MenuItem onTouchTap={ (e) => this.handleRank(e) }>排行榜</MenuItem>
                    <MenuItem onTouchTap={ (e) => this.handleUser(e) }>个人中心</MenuItem>
                    <MenuItem onTouchTap={ (e) => this.handleLogout(e) }>退出登录</MenuItem>
                </Drawer>
            </AppBar>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VAppBar);