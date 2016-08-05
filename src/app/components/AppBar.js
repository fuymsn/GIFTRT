import React from 'react';
import { AppBar } from 'material-ui';

export default class ChatToolBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <AppBar
                title="Chat"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        )
    }
}