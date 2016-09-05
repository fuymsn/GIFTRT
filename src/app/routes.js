import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Main from './containers/Main';
import Video from './containers/Video';
import Login from './containers/Login';
import Search from './containers/Search';
import Home from './containers/Home';
import Rank from './containers/Rank';
import User from './containers/User';
import Activity from './containers/Activity';
import ActivityDetail from './containers/ActivityDetail';
import UserInfoEdit from './containers/UserInfoEdit';

export default (
    <Route path="/" component={ Main }>
        <IndexRoute component={ Login } />
        <Redirect from="/" to="/login" />
        <Route path="/home" component={ Home } />
        <Route path="/login" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/rank" component={ Rank } />
        <Route path="/activity" component={ Activity } />
        <Route path="/activity/:id" component={ ActivityDetail } />
        <Route path="/user" component={ User }>
            <Route path="edit" component={ UserInfoEdit } />
        </Route>

        <Route path="/video/:id" component={ Video } />
        
    </Route>
)