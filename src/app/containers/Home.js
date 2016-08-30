import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

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
    flex: 1
  }
};

function mapStateToProps(state) {
    return {
        slideIndex: state.homeSlideIndex.slideIndex
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

//主题
class Home extends Component {

  handleChange(value) {
      this.props.actions.setHomeTabIndex(value);
  };

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
            <VideoList />
          </div>
          <div style={style.slide}>
            slide n°2
          </div>
          <div style={style.slide}>
            slide n°3
          </div>
          <div style={style.slide}>
            一对一
          </div>
          <div style={style.slide}>
            我的关注
          </div>
        </SwipeableViews>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
