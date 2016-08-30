import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RaisedButton, Checkbox, TextField, SelectField, MenuItem } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
//聊天窗口头部
import SaveAppBar from '../components/SaveAppBar';
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
class UserInfoEdit extends Component {
  
  handleChange(e, index, value){
    
  }

  render() {
    return (
    <div>
      <SaveAppBar title="编辑个人信息" />
      <div style={ styles.container}>
        <TextField
            //hintText="Hint Text"
            floatingLabelText="昵称"
            fullWidth={true}
            inputStyle={ styles.input }
        /><br />
        <TextField
            //hintText="签名"
            floatingLabelText="签名"
            multiLine={true}
            fullWidth={true}
            rows={2}
        /><br />
        <SelectField value={0} fullWidth={true}>
          <MenuItem value={0} primaryText="男" />
          <MenuItem value={1} primaryText="女" />
          <MenuItem value={2} primaryText="保密" />
        </SelectField>
        <SelectField value={0} fullWidth={true}>
          <MenuItem value={0} primaryText="地点" />
          <MenuItem value={1} primaryText="北京" />
          <MenuItem value={2} primaryText="上海" />
          <MenuItem value={3} primaryText="广州" />
        </SelectField>
        <DatePicker hintText="生日" fullWidth={true}/>
      </div>
    </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoEdit);
