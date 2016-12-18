import React, {Component, PropTypes} from "react";
import MobileAction from "../utils/MobileAction";
import Button from "../components/Button";
import List from "../components/List";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";

//样式
const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    listItem: {
        backgroundColor: '#fff'
    },
    clearButton: {
        margin: '6px 6px 0px 0px'
    },

    logoutButton: {
        paddingLeft: '15px',
        paddingRight: '15px' 
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

    //版本更新
    handleUpdateVersion(e) {
        MobileAction.updateVersion();
    }

    render() {

        let {dropDownValue, slideIndex, anchorLists} = this.props;

        return (
            <div style={ style.container }>
                {/*<List style={ style.list }>
                    <ListItem 
                        label="消息提醒" 
                        rightToggle={<Toggle /> }
                        style={ style.listItem }
                        disabled={true} 
                    />
                </List>*/}
                <List>
                    <ListItem 
                        label="清除缓存" 
                        elementRight={ <Button 
                            type="flat"
                            label="立即清除"
                            style={ style.clearButton }
                            onTouchTap={ (e)=>{ this.handleClearCache(e) } }
                        />}
                        style={ style.listItem }
                        disabled={true} 
                    />
                </List>
                {/*
                <List style={ style.list }>
                    <ListItem 
                        label="版本更新" 
                        rightIconButton={ <FlatButton 
                            primary={true}
                            label="检查更新"
                            style={ style.clearButton }
                            onTouchTap={ (e)=> this.handleUpdateVersion(e)}
                        />}
                        style={ style.listItem }
                        disabled={true} 
                    />
                </List>*/}
                <List>
                    <ListItem label="条款" iconRight={<Icon type="list" icon="list-arrow-right"/>} style={ style.listItem } onTouchTap={ (e)=> this.handleLinkToInfo(e, {pageId: 'terms', title: '条款'}) } />
                    <ListItem label="关于" iconRight={<Icon type="list" icon="list-arrow-right"/>} style={ style.listItem } onTouchTap={ (e)=> this.handleLinkToInfo(e, {pageId: 'about', title: '关于'}) }/>
                </List>
                <List style={ style.logoutButton }>
                    <Button label="退出登录" primary={true} fullWidth={true} onTouchTap={ (e)=>{this.handleLogout(e) } } />
                </List>
            </div>
        );
    }

}

export default Setting;
