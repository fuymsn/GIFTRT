import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Icon from './Icon';

const style = {
	appBarTitle:{
		textAlign: 'center',
        textIndent: '-17px',
        userSelect: 'none'
	}
};

class BasicAppBar extends Component {
  render() {
    let { title } = this.props;

    return (
        <AppBar
            title={ title }
            iconElementLeft={
                <Icon icon="logo-white" type="logo"/>
            }
            titleStyle={ style.appBarTitle }
        />
    )
}};

export default BasicAppBar;