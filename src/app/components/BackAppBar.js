import React from 'react';
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

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const BackAppBar = () => (
  <AppBar
    title={<span style={styles.title}>Title</span>}
    iconElementLeft={ 
        <IconButton
            onTouchTap={ handleLeftBtn }
            >
            <NavigationClose />
        </IconButton>
    }
    iconElementRight={ 
        <FlatButton 
            label="Save" 
            onTouchTap={ handleRightBtn }
            /> 
        }
  />
);

export default BackAppBar;