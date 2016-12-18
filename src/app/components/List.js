import React, { Component } from 'react';
import objectAssign from "object-assign";
Object.assign = objectAssign;

const initStyle = {
    root: {
        padding: '8px 0px',
        marginTop: '10px'
    }
}

class List extends Component {

    

    render() {
        let { style } = this.props;
        let listStyle = Object.assign({}, initStyle.root, style);

        return (
            <div style={ listStyle}>{ this.props.children }</div>
        )
    }
}

export default List;