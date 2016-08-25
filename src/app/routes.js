import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './containers/Main';
import Video from './containers/Video';
import Login from './containers/Login';
import Search from './containers/Search';
import Home from './containers/Home';
import Rank from './containers/Rank';
import User from './containers/User';
import UserInfoEdit from './containers/UserInfoEdit';

export default (
    <Route path="/" component={ Main }>
        <IndexRoute component={ Video } />
        <Route path="/home" component={ Home } />
        <Route path="/login" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/rank" component={ Rank } />
        <Route path="/user" component={ User }>
            
        </Route>
        <Route path="/user/edit" component={ UserInfoEdit } />
    </Route>
)