import React from 'react';
import { render } from 'react-dom';

import { browserHistory, hashHistory } from 'react-router';

import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from './containers/Main';
import reducers from './reducers';
import * as actions from './actions';

import WS from './utils/WS.js';

require("../www/style/main.less");
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// redux
//let store = createStore(chatApp);
// 调试模式
let store = createStore(reducers, window.devToolsExtension && window.devToolsExtension(), applyMiddleware(thunkMiddleware));

// root element
let rootElement = document.getElementById('app');

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(
    <Main store={ store } history={ hashHistory }/>,
    rootElement
);

const VURL = 'ws://10.1.100.190:9877/ws';

const sock = {
    ws: null,
    URL: VURL,
    wsDispatcher: (msg) => {
        return store.dispatch(actions.receiveMessage( JSON.parse(msg).info ));
    },
    wsListener: () => {
        const { lastAction } = store.getState();

        switch (lastAction.type) {
            case actions.POST_MESSAGE:
                return sock.sendWS({"cmd": 30001, "info": lastAction.text});
            case actions.CONNECT:
                return sock.startWS();
            case actions.DISCONNECT:
                return sock.stopWS();
            default:
                return;
        }
    },

    //启动
    startWS: () => {
        if(!!sock.ws) sock.ws.close();

        sock.ws = new WS(sock.URL, sock.wsDispatcher);
        //登录
        sock.ws.onOpenState(function(){
            sock.sendWS({"cmd":10001,"info":"login"});
        });

        
    },

    //关闭
    stopWS: () => {
        sock.ws.close();
        sock.ws = null;
    },

    sendWS: (json) => {
        sock.ws.postMessage(JSON.stringify({"cmd": json.cmd, "info": json.info}));
    }

}

store.subscribe(()=> sock.wsListener());

//触发
//store.dispatch(actions.connect());