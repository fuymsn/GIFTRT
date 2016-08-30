import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RaisedButton, Checkbox, TextField } from 'material-ui';
import {List, ListItem} from 'material-ui/List';

//聊天窗口头部
import VAppBar from '../components/VAppBar';
//actions
import * as ChatActions from '../actions';
//样式
const styles = {
  container: {
    //textAlign: 'center',
    //paddingTop: 200,
    paddingLeft: "18px",
    paddingRight: "18px"
  },

  checkbox: {
    marginTop: "20px"
  }
};

function mapStateToProps(state) {
  return {
    isConnected: state.messages.status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChatActions, dispatch)
  }
}

//主题
class User extends Component {
  
  handleEdit() {
    location.href = '#/user/edit';
  }
  
  render() {
    return (
    <div>
      <VAppBar title="个人中心" />
      <List>
        <ListItem
          primaryText='昵称：太阳神'
          disabled={ true }
        />
        <ListItem
          primaryText='签名：这是签名，太阳神Gage。这是签名，太阳神Gage。这是签名，太阳神Gage。这是签名，太阳神Gage这是签名，太阳神Gage'
          disabled={ true }
        />
        <ListItem
          primaryText='性别：男'
          disabled={ true }
        />
        <ListItem
          primaryText='生日：1995年4月1日'
          disabled={ true }
        />
        <ListItem
          primaryText='位置：北京'
          disabled={ true }
        />
      </List>
      <div style={ styles.container}>
        <RaisedButton label="编 辑" primary={true} fullWidth={true} onClick={ (e) => {this.handleEdit(e)} } />
      </div>
    </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(User);
