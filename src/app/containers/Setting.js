import React, {Component, PropTypes} from "react";
import {List, ListItem} from 'material-ui/List';
import { AppBar, DropDownMenu, MenuItem, IconButton, FlatButton, Toggle, RaisedButton } from "material-ui";
import IconChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import BasicAppBar from "../components/BasicAppBar";
import MobileAction from "../utils/MobileAction";

//样式
const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    list:{
        marginTop: '10px'
    },
    listItem: {
        backgroundColor: '#fff'
    },
    clearButton: {
        margin: '6px 6px 0px 0px'
    },
    buttonBox: {
        margin: '10px 0',
        padding: 10
    }
};

//主题
class Setting extends Component {

    //清除缓存
    handleClearCache() {
        MobileAction.clearCache();
    };

    //退出登录
    handleLogout() {
        window.localStorage.setItem('token', null);
        MobileAction.logout();
    };

    //信息页面
    handleLinkToInfo(e, info) {
		//阻止默认事件
        e.preventDefault();

        //数据重组
        let json = JSON.stringify({
            dir: 'activity',
            title: info.title,
            url: '#/info/' + info.pageId
        });
        
		//执行跳转
        MobileAction.switchPage(json);
    }

    render() {

        let {dropDownValue, slideIndex, anchorLists} = this.props;

        return (
            <div style={ style.container }>
                {/*<List style={ style.list }>
                    <ListItem 
                        primaryText="消息提醒" 
                        rightToggle={<Toggle /> }
                        style={ style.listItem }
                        disabled={true} 
                    />
                </List>*/}
                <List style={ style.list }>
                    <ListItem 
                        primaryText="清除缓存" 
                        rightIconButton={ <FlatButton 
                            primary={true}
                            label="立即清除"
                            style={ style.clearButton }
                            onTouchTap={ (e)=>{ this.handleClearCache(e) } }
                        />}
                        style={ style.listItem }
                        disabled={true} 
                    />
                </List>
                <List style={ style.list }>
                    <ListItem primaryText="条款" rightIcon={<IconChevronRight />} style={ style.listItem } onTouchTap={ (e)=> this.handleLinkToInfo(e, {pageId: 'terms', title: '条款'}) } />
                    <ListItem primaryText="关于" rightIcon={<IconChevronRight />} style={ style.listItem } onTouchTap={ (e)=> this.handleLinkToInfo(e, {pageId: 'about', title: '关于'}) }/>
                </List>
                <div style={ style.buttonBox }>
                    <RaisedButton label="退出登录" primary={true} fullWidth={true} onTouchTap={ (e)=>{this.handleLogout(e) } } />
                </div>
            </div>
        );
    }

}

export default Setting;
