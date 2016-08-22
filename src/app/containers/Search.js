import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RaisedButton, Checkbox, TextField } from 'material-ui';
import {Toolbar, ToolbarSeparator, ToolbarGroup} from 'material-ui/Toolbar';

//聊天窗口头部
import VAppBar from '../components/VAppBar';
//actions
import * as ChatActions from '../actions';
//样式
const styles = {
  container: {
    //textAlign: 'center',
    //paddingTop: 200,
    paddingLeft: "20px",
    paddingRight: "20px"
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

// function mapStateToProps(state) {

// }

// function mapDispatchToProps(dispatch) {

// }

//主题
class Search extends Component {
  
  handleSearch(e){
    
  }

  render() {
    return (
    <div>
      <VAppBar />
      <Toolbar style={styles.toolBar}>
        <ToolbarGroup style={styles.toolBarGroup}>
          <TextField hintText="主播名或主播ID" fullWidth={true} ref="chatInput"/>
          <ToolbarSeparator />
          <RaisedButton label="搜索" primary={true} style={styles.sendBotton} onClick={(e)=> this.handleSearch(e)}/>
        </ToolbarGroup>
      </Toolbar>

      <div style={ styles.container}>

      </div>
    </div>
    );
  }

}

export default Search;
