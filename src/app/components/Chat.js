import React, { Component } from 'react';

import ChatList from './ChatList';
import ChatToolBar from './ChatToolBar';

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    }
}

class Chat extends Component {
    render() {
        return (
            <div style={ styles.container }>
                <ChatList />
                <ChatToolBar />
            </div>
        )
    }
}

export default Chat;