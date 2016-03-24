var React = require('react');
var ReactDOM = require('react-dom');
var WeUI = require('react-weui');
require('weui');

var { Button } = WeUI;

var App = React.createClass({
    render: function(){
        return (
            <Button>heoss st</Button>
        );
    }
}); 

ReactDOM.render((
    <App/>
), document.getElementById('container'));