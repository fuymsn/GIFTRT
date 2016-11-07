import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Tabs, Tab} from "material-ui/Tabs";

import VideoList from "../components/VideoList";
import * as actions from "../actions";
import Title from "../components/Title";
import Snackbar from "material-ui/Snackbar";
import BasicAppBar from '../components/BasicAppBar';

//聊天窗口头部

//样式
const style = {
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    tabs: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },

    tabsContainer: {
        overflowX: 'hidden',
        padding: "0px 5px 60px 5px"
    }
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
    };

    /**
     * 加载主页列表
     */
    // loadLobbyFromServer() {
    //     this.props.actions.fetchLobby();
    // };

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
        //加载大厅数据
        //this.loadLobbyFromServer();

        //加载首页其他两个列表数据
        this.loadVideoListFromServer('rec');
        this.loadVideoListFromServer('all');
        //加载关注
        this.loadFollowingFromServer();
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

            if(scrollTop + target.clientHeight + 50 > target.scrollHeight && videoLists[this.LIST_TYPES[slideIndex].title].scrollable){
                //scrollable 设置为false
                this.props.actions.updateScrollable(this.LIST_TYPES[slideIndex].title, false);
                this.LIST_TYPES[slideIndex].scrollPage++;
                this.props.actions.updateScrollPage(this.LIST_TYPES[slideIndex].title, this.LIST_TYPES[slideIndex].scrollPage);
                setTimeout(()=>{
                    this.props.actions.updateScrollable(this.LIST_TYPES[slideIndex].title, true);
                }, 2000);
            }
            
        }.bind(this);
        //console.log(target);
    }

    handleSnackbarRequestClose(){
        this.props.actions.updateSnackbar({open:false});
    }

    render() {

        let {slideIndex, snackbar} = this.props;
        
        let tabsStyle = {
            backgroundColor: this.context.muiTheme.palette.white
        }

        let tabStyle = {
            color: this.context.muiTheme.palette.textColor,
            fontWeight: 'bold'
        }

        return (
            <div style={ style.container }>
                <BasicAppBar title="大厅" />
                <Tabs
                    onChange={ (slideIndex) => {
                        this.handleChange(slideIndex);
                    } }
                    value={ slideIndex }
                    tabItemContainerStyle={ tabsStyle }
                    //inkBarStyle={{transition:'none'}}
                    contentContainerStyle={ style.tabsContainer }
                    style={ style.tabs }
                >
                    <Tab label="直播大厅" value={0} style={ tabStyle } >
                        <div id="hall">
                            <Title title='美女主播'/>
                            <VideoList listType={ 'lobbyRec' }/>

                            <Title title='全部主播'/>
                            <VideoList listType={ 'lobbyAll' }/>
                        </div>
                    </Tab>
                    <Tab label="美女主播" value={1} style={ tabStyle }>
                        <div>
                            <Title title='美女主播'/>
                            <VideoList listType={ 'rec' }/>
                        </div>
                    </Tab>
                    <Tab label="全部主播" value={2} style={ tabStyle }>
                        <div>
                            <Title title='全部主播'/>
                            <VideoList listType={ 'all' }/>
                        </div>
                    </Tab>
                    <Tab label="我的关注" value={3} style={ tabStyle }>
                        <div>
                            <Title title='我的关注'/>
                            <VideoList listType={ 'following' }/>
                        </div>
                    </Tab>
                </Tabs>

                <Snackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    autoHideDuration={snackbar.autoHideDuration}
                    //action={snackbar.action}
                    //onActionTouchTap={this.handleActionTouchTap}
                    onRequestClose={this.handleSnackbarRequestClose.bind(this)}
                />
            </div>
        );
    }
}


Home.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
