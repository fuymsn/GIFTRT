import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
//import {Tabs, Tab} from "material-ui/Tabs";

import VideoList from "../components/VideoList";
import * as actions from "../actions";
import Title from "../components/Title";
//import Snackbar from "material-ui/Snackbar";
import AppBar from '../components/AppBar';
import Common from '../utils/Common';
import Icon from '../components/Icon';
import Tabs from '../components/Tabs';

//聊天窗口头部

//样式
const style = {
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    tabs: {
        root: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },


        tabItemContainerStyle: {
            backgroundColor: '#fff',
            display: 'block',
            height: 50
        },
        
        contentContainerStyle: {
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: "0px 5px 5px 5px",
        },

        tabStyle: {
            color: '#555',
            fontWeight: 'bold'
        },

        tabContentContainerStyle: {
            margin: '0px 0px 60px 0px',
            padding: "0px 5px 5px 5px",
        }
    },
};

const mapStateToProps = (state) => {
    return {
        slideIndex: state.home.slideIndex,
        snackbar: state.snackbar,
        videoLists: state.videoLists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

//主题
class Home extends Component {
    constructor() {
        super();
        this.LIST_TYPES = [
            {
                title: 'hall',
                scrollPage: 0
            },
            {
                title: 'rec',
                scrollPage: 0
            },
            {
                title: 'all',
                scrollPage: 0
            },
            {
                title: 'following',
                scrollPage: 0
            }
            
        ]
    };

    handleChange(value) {
        this.props.actions.setHomeTabIndex(value);

        if(value == 3){

            if (this.props.videoLists.following.items.length == 0) {
                this.loadFollowingFromServer();
            }

        }
    };

    /**
     * 加载 推荐主播，关注主播 列表
     */
    loadVideoListFromServer(type) {
        this.props.actions.fetchVideoList(type);
    }

    /**
     * 加载关注列表
     */
    loadFollowingFromServer() {
        setTimeout(()=> {
            this.props.actions.fetchUserFollowing();
        }, 1500);
    }

    componentDidMount() {

        //加载首页两个列表数据
        this.loadVideoListFromServer('rec');
        this.loadVideoListFromServer('all');
        
        //加载关注
        this.loadFollowingFromServer();

        //初始化scroll组件
        this.handleScroll();
    }

    //scroll 滚动加载处理。
    handleScroll(e) {
        
        let node = document.getElementById("hall");
        let target = node.parentElement.parentElement;

        target.onscroll = function(){

            let { slideIndex, videoLists } = this.props;
            let scrollTop = target.scrollTop;
            //alert(scrollTop);
            //后期优化数据表现
            if( slideIndex == 0 || slideIndex == 3 ) return;
            
            //临界点（向下滚动功能）
            let criticalPoint = (target.scrollHeight - target.offsetHeight - target.scrollTop) / target.offsetHeight;

            //临界点设置为0.02
            if(criticalPoint < 0.02 && videoLists[this.LIST_TYPES[slideIndex].title].scrollable){
                //scrollable 设置为false
                this.props.actions.updateScrollable(this.LIST_TYPES[slideIndex].title, false);
                this.LIST_TYPES[slideIndex].scrollPage++;
                this.props.actions.updateScrollPage(this.LIST_TYPES[slideIndex].title, this.LIST_TYPES[slideIndex].scrollPage);
                setTimeout(()=>{
                    this.props.actions.updateScrollable(this.LIST_TYPES[slideIndex].title, true);
                }, 50);
            }
            
        }.bind(this);
        //console.log(target);
    }

    handleSnackbarRequestClose(){
        this.props.actions.updateSnackbar({open:false});
    }

    render() {

        let {slideIndex, snackbar} = this.props;
        let tabStyleActive = {
            height: 'initial',
            overflow: 'initial'
        }

        let tabStyle = {
            height: '0px',
            overflow: 'hidden'
        }

        return (
            <div style={ style.container }>
                <AppBar title="大厅" elementLeft={
                    <Icon icon="logo-white" type="logo"/>
                } />

                <Tabs 
                    value={ slideIndex }
                    onChange={(slideIndex) => {
                        this.handleChange(slideIndex);
                    }} >
                    <div label="直播大厅" value={0} style={ tabStyleActive }>
                        <div id="hall" style={ style.tabs.tabContentContainerStyle }>
                            <Title title='美女主播'/>
                            <VideoList listType={ 'lobbyRec' }/>

                            <Title title='全部主播'/>
                            <VideoList listType={ 'lobbyAll' }/>
                        </div></div>
                    <div label="美女主播" value={1} style={ tabStyle }>
                        <div style={ style.tabs.tabContentContainerStyle }>
                            <Title title='美女主播'/>
                            <VideoList listType={ 'rec' }/>
                        </div>
                    </div>
                    <div label="全部主播" value={2} style={ tabStyle }>
                        <div style={ style.tabs.tabContentContainerStyle }>
                            <Title title='全部主播'/>
                            <VideoList listType={ 'all' }/>
                        </div>
                    </div>
                    <div label="我的关注" value={3} style={ tabStyle }>
                        <div style={ style.tabs.tabContentContainerStyle }>
                            <Title title='我的关注'/>
                            <VideoList listType={ 'following' }/>
                        </div>
                    </div>
                </Tabs>
                {/*<Tabs
                    onChange={ (slideIndex) => {
                        this.handleChange(slideIndex);
                    } }
                    value={ slideIndex }
                    
                    style={ style.tabs.root }
                    inkBarStyle={{ transition:'none' }}
                    contentContainerStyle={ style.tabs.contentContainerStyle }
                    tabItemContainerStyle={ style.tabs.tabItemContainerStyle }
                >
                    <Tab label="直播大厅" value={0} style={ style.tabs.tabStyle } >
                        <div id="hall" style={ style.tabs.tabContentContainerStyle }>
                            <Title title='美女主播'/>
                            <VideoList listType={ 'lobbyRec' }/>

                            <Title title='全部主播'/>
                            <VideoList listType={ 'lobbyAll' }/>
                        </div>
                    </Tab>

                    <Tab label="美女主播" value={1} style={ style.tabs.tabStyle }>
                        <div style={ style.tabs.tabContentContainerStyle }>
                            <Title title='美女主播'/>
                            <VideoList listType={ 'rec' }/>
                        </div>
                    </Tab>

                    <Tab label="全部主播" value={2} style={ style.tabs.tabStyle }>
                        <div style={ style.tabs.tabContentContainerStyle }>
                            <Title title='全部主播'/>
                            <VideoList listType={ 'all' }/>
                        </div>
                    </Tab>

                    <Tab label="我的关注" value={3} style={ style.tabs.tabStyle }>
                        <div style={ style.tabs.tabContentContainerStyle }>
                            <Title title='我的关注'/>
                            <VideoList listType={ 'following' }/>
                        </div>
                    </Tab>
                </Tabs>*/}

                {/*<Snackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    autoHideDuration={snackbar.autoHideDuration}
                    //action={snackbar.action}
                    //onActionTouchTap={this.handleActionTouchTap}
                    onRequestClose={this.handleSnackbarRequestClose.bind(this)}
                />*/}
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
