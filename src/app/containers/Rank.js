import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import VAppBar from '../components/VAppBar';
import RankList from '../components/RankList';

//actions
import * as actions from '../actions';
//样式
const style = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    rankList: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }
};

function mapStateToProps(state) {
    return {
        slideIndex: state.rankSlideIndex.slideIndex
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

//主题
class Rank extends Component {

  handleChange(value) {
      this.props.actions.setRankTabIndex(value);
  };

  render() {

    let { slideIndex } = this.props;
    
    return (
    <div style={ style.container }>
      <VAppBar title="排行榜" />
      <Tabs
          onChange={ (slideIndex) =>{ this.handleChange(slideIndex) } }
          value={ slideIndex }
      >
          <Tab label="日榜" value={0} />
          <Tab label="周榜" value={1} />
          <Tab label="月榜" value={2} />
          <Tab label="总榜" value={3} />
      </Tabs>
      <SwipeableViews
        index={ slideIndex }
        onChangeIndex={ (slideIndex) =>{ this.handleChange(slideIndex) } }
        style={ style.rankList }
      >
        <RankList />

        <div style={style.slide}>
          <h2 style={style.headline}>Tabs with slide effect</h2>
          Swipe to see the next slide.<br />
          排行榜2
        </div>
        <div style={style.slide}>
          slide n°3
        </div>
        <div style={style.slide}>
          排行榜4
        </div>
      </SwipeableViews>
    </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Rank);
