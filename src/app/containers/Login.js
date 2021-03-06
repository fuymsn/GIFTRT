import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RaisedButton, Checkbox, TextField } from 'material-ui';

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

  input: {
      //marginTop: "0px"
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
class Login extends Component {
  
  handleLogin(e){
    
    this.props.isConnected ? this.props.actions.disconnect() : this.props.actions.connect();
    location.href = "#/home";

  }

  render() {

    return (

      <div>
        <VAppBar title="登录" />
        <div style={ styles.container}>
          <TextField
              //hintText="Hint Text"
              floatingLabelText="登录邮箱"
              fullWidth={true}
              inputStyle={ styles.input }
          /><br />
          <TextField
              //hintText="Hint Text"
              floatingLabelText="登录密码"
              fullWidth={true}
              inputStyle={ styles.input }
          /><br />
          <Checkbox
              label="记住密码"
              style={styles.checkbox}
          /><br/>
          <RaisedButton label="登 录" primary={true} fullWidth={true} onClick={ (e) => {this.handleLogin(e)} } />
        </div>
      </div>

    );
    
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
