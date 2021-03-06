import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RaisedButton, Checkbox, TextField } from 'material-ui';
import {Toolbar, ToolbarSeparator, ToolbarGroup} from 'material-ui/Toolbar';

//聊天窗口头部
import VAppBar from '../components/VAppBar';
import VideoList from '../components/VideoList';

//data
import tilesData from '../data/searchVideoList';

//actions
import * as actions from '../actions';

//样式
const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },

    toolBarGroup: {
        width: "100%"
    },
    toolBar: {
        bottom: "0px",
        width: "100%"
    },
    sendBotton: {
      marginRight: "0px",
      //float: "right"
    }
};

const mapStateToProps = (state) => {
  return {
    lists: state.searchVideos.videos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

//主题
class Search extends Component {
  
  handleSearch(e){
    this.props.actions.searchVideos(tilesData);
  }

  render() {

    let { lists } = this.props;

    return (
    <div style={ styles.container } >
      <VAppBar title="搜索" />
      <Toolbar style={styles.toolBar}>
        <ToolbarGroup style={styles.toolBarGroup}>
          <TextField hintText="主播名或主播ID" fullWidth={true} ref="chatInput"/>
          <ToolbarSeparator />
          <RaisedButton label="搜索" primary={true} style={styles.sendBotton} onClick={(e)=> this.handleSearch(e)}/>
        </ToolbarGroup>
      </Toolbar>

      <VideoList videoLists={ lists } />

    </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
