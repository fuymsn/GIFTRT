import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/button.es6'
class App extends React.Component{
    render() {
        return (
        	<div>
        		<div>love you so much</div>
        		<Button />
        	</div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('container'));