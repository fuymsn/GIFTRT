import React from 'react';
import { render } from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component
import chatApp from './reducers';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// redux
//let store = createStore(chatApp);
// 调试模式
let store = createStore(chatApp, window.devToolsExtension && window.devToolsExtension());
// root element
let rootElement = document.getElementById('app');

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(
    <Provider store = {store}>
        <Main />
    </Provider>, 
    rootElement
);
