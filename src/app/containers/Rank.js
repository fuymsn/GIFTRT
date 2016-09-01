import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import VAppBar from '../components/VAppBar';
import RankList from '../components/RankList';

import rankAnchorList from '../data/rankAnchorList';

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

const mapStateToProps = (state) => {
    return {
        slideIndex: state.rank.slideIndex,
        anchorLists: state.rank.anchorLists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

//主题
class Rank extends Component {

  handleChange(value) {
      this.props.actions.setRankTabIndex(value);
  };

  loadAnchorRankFromServer() {
    this.props.actions.updateRankAnchorLists(rankAnchorList);
  };

  componentDidMount() {
    this.loadAnchorRankFromServer();
  };

  render() {

    let { slideIndex, anchorLists } = this.props;
    
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
        <RankList anchorLists={ anchorLists.day }/>
        <RankList anchorLists={ anchorLists.week }/>
        <RankList anchorLists={ anchorLists.month }/>
        <RankList anchorLists={ anchorLists.total }/>

      </SwipeableViews>
    </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Rank);
