import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import $ from 'jquery';

//聊天窗口头部
import VAppBar from '../components/VAppBar';
import VideoList from '../components/VideoList';

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

    var that = this;

    $.ajax({
      url: '/videolist.json',
      dataType: 'json',
      type: 'GET',
      data: {
        '_': (new Date()).getTime()
      },
      success: function(data){
        var indexData = {};
        indexData.rec = data.rec;
        that.props.actions.updateHomeVideoLists(indexData);
      },
      error: function(ret){
        console.log(ret.responseText);
      }
    });
    
  }

  componentDidMount(){
    this.loadVideoListFromServer();
  }

  render() {

    let { slideIndex, videoLists } = this.props;
    
    return (
      <div style={ style.container }>

        <Tabs
            onChange = { (slideIndex) =>{ this.handleChange(slideIndex) } }
            value = { slideIndex }
        >
            <Tab label="直播大厅" value={0} />
            <Tab label="美女主播" value={1} />
            <Tab label="全部主播" value={2} />
            <Tab label="我的关注" value={3} />
        </Tabs>
        <SwipeableViews
          index={ slideIndex }
          onChangeIndex={ (slideIndex) =>{ this.handleChange(slideIndex) } }
          style={ style.videoList }
        >
          <div style={style.slide}>
            <VideoList videoLists={ videoLists.rec }/>
          </div>
          <div style={style.slide}>
            <h2>小编暂时还没有推荐哟！</h2>
            <p>观看其它主播吧。</p>
          </div>
          <div style={style.slide}>
            <VideoList videoLists={ videoLists.rec }/>
          </div>
          <div style={style.slide}>
            <VideoList videoLists={ videoLists.rec }/>
          </div>
        </SwipeableViews>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
