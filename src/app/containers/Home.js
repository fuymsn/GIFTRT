import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

//聊天窗口头部
import VAppBar from '../components/VAppBar';
import VideoList from '../components/VideoList';

//data
import tilesData from '../data/homeVideoList';

//actions
import * as actions from '../actions';
//样式
const style = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  slide: {
    overflowX: 'hidden'
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
        videoLists: state.home.videoLists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

//主题
class Home extends Component {

  handleChange(value) {
    this.props.actions.setHomeTabIndex(value);
  };

  loadVideoListFromServer() {
    this.props.actions.updateHomeVideoLists(tilesData);
  }

  componentDidMount(){
    this.loadVideoListFromServer();
  }

  render() {

    let { slideIndex } = this.props;
    
    return (
      <div style={ style.container }>
        <VAppBar title='大厅' />
        <Tabs
            onChange = { (slideIndex) =>{ this.handleChange(slideIndex) } }
            value = { slideIndex }
        >
            <Tab label="大厅" value={0} />
            <Tab label="小编推荐" value={1} />
            <Tab label="才艺主播" value={2} />
            <Tab label="一对一" value={3} />
            <Tab label="关注" value={4} />
        </Tabs>
        <SwipeableViews
          index={ slideIndex }
          onChangeIndex={ (slideIndex) =>{ this.handleChange(slideIndex) } }
          style={ style.videoList }
        >
          <div style={style.slide}>
            <VideoList videoLists={ tilesData.all }/>
          </div>
          <div style={style.slide}>
            <h2>小编暂时还没有推荐哟！</h2>
            <p>观看其它主播吧。</p>
          </div>
          <div style={style.slide}>
            <VideoList videoLists={ tilesData.vip }/>
          </div>
          <div style={style.slide}>
            <h2>按时还没有一对一房间哟！</h2>
            <p>观看其它主播吧。</p>
          </div>
          <div style={style.slide}>
            <VideoList videoLists={ tilesData.fav }/>
          </div>
        </SwipeableViews>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
