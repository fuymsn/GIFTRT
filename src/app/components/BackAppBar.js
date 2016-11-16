import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/arrow-back';

function handleLeftBtn() {
    window.history.back();
}

function handleRightBtn() {
    window.history.back();
}

const style = {
  title: {
    textAlign: 'center'
  },
};

class BackAppBar extends Component {
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
        style={style.title}
        className='appBar'
      />
    )
}};

export default BackAppBar;