import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

function handleLeftBtn() {
    window.history.back();
}

function handleRightBtn() {
    window.history.back();
}

class BackAppBar extends Component{
    render() {
        return (
            <AppBar
                title={ this.props.title }
                iconElementLeft={ 
                    <IconButton
                        onTouchTap={ handleLeftBtn }
                        >
                        <NavigationClose />
                    </IconButton>
                }
                iconElementRight={
                    <FlatButton 
                        label="保存" 
                        onTouchTap={ handleRightBtn }
                        /> 
                    }
                className='appBar'
            />
            );

    }
}

export default BackAppBar;