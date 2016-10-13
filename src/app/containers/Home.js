import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Tabs, Tab} from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";
import VideoList from "../components/VideoList";
import * as actions from "../actions";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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

    slide: {
        overflowX: 'hidden',
        paddingLeft: "10px",
        paddingRight: "10px",
    },

    videoList: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    }
};

const mapStateToProps = (state) => {
    return {
        slideIndex: state.home.slideIndex,
        snackbar: state.snackbar,
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
            'rec',
            'all'
        ]
    };

    handleChange(value) {
        this.props.actions.setHomeTabIndex(value);
    };

    /**
     * 加载主页列表
     */
    loadLobbyFromServer() {
        this.props.actions.fetchLobby();
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
        this.loadLobbyFromServer();
        this.LIST_TYPES.forEach(function (type) {
            this.loadVideoListFromServer(type)
        }.bind(this));
        this.loadFollowingFromServer();
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
                        this.handleChange(slideIndex)
                    } }
                    value={ slideIndex }
                    tabItemContainerStyle={ tabsStyle }
                    //inkBarStyle={{transition:'none'}}
                >
                    <Tab label="直播大厅" value={0} style={ tabStyle }/>
                    <Tab label="美女主播" value={1} style={ tabStyle }/>
                    <Tab label="全部主播" value={2} style={ tabStyle }/>
                    <Tab label="我的关注" value={3} style={ tabStyle }/>
                </Tabs>
                <SwipeableViews
                    index={ slideIndex }
                    onChangeIndex={ (slideIndex) => {
                        this.handleChange(slideIndex)
                    } }
                    style={ style.videoList }
                    disabled={ true }
                    //animateTransitions={false}
                >
                    <div style={style.slide}>

                        <Title title='美女主播'/>
                        <VideoList key={'lobby_rec'} listType={ 'lobby_rec' }/>

                        <Title title='全部主播'/>
                        <VideoList key={'lobby_all'} listType={ 'lobby_all' }/>
                    </div>
                    <div style={style.slide}>

                        <Title title='美女主播'/>
                        <VideoList key={'rec'} listType={ 'rec' }/>

                    </div>
                    <div style={style.slide}>

                        <Title title='全部主播'/>
                        <VideoList key={'all'} listType={ 'all' }/>

                    </div>
                    <div style={style.slide}>
                        <Title title='我的关注'/>
                        <VideoList key={'following'} listType={ 'following' }/>
                    </div>
                </SwipeableViews>
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
