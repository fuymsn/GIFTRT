import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import Button from './components/button.es6'

class Inbox extends React.Component{
	render() {
		return (
			<div>
				<h1>Inbox</h1>
				<ul>
	    			<li><Link to="message/1">message1</Link></li>
	    			<li><Link to="message/2">message2</Link></li>
	    		</ul>
				{ this.props.children || "messages inbox."}
			</div>
		)
	}
}

class About extends React.Component{
	render() {
		return (
			<h1>About</h1>
		)
	}
}

class Dashboard extends React.Component{
	render() {
		return (
			<h1>This is Dashboard</h1>
		)
	}
}

class Message extends React.Component{
	render() {
		return (
			<div>
				<h3>Message { this.props.params.id }</h3>
    		</div>
		)
	}
}

class App extends React.Component{
    render() {
        return (
        	<div>
        		<div>This is my app!<Button /></div>
        		<ul>
        			<li><Link to="/inbox">inbox</Link></li>
        			<li><Link to="/about">about</Link></li>
        		</ul>
        		{this.props.children}
        	</div>
        );
    }
}

const routes = {
	path: "/",
	component: App,
	indexRoute: { component: Dashboard },
	childRoutes: [
		{
			path: 'inbox',
			component: Inbox,
			childRoutes: [{
				path: 'message/:id',
				onEnter: ({ params }, replace) => { replace('/message/${params.id}') }
			}]
		},
		{ path: 'about', component: About },
		{ 
			component: Inbox,
			childRoutes: [{
				path: 'message/:id', 
				component: Message
			}]
		}
	]
}

ReactDOM.render(<Router routes={ routes } history={ hashHistory } />, document.getElementById('container'));

//ReactDOM.render(<App />, document.getElementById('container'));