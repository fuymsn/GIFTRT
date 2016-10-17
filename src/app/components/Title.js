/**
 * Title 组件，用于显示app常用title
 * author: Young
 * param: 
 */

import React, { Component } from 'react';

const initStyle = {
    borderLeft: '5px solid #FA0A82',
    lineHeight: '14px',
    fontSize: '14px',
    margin: '10px 0px 10px 2px',
    paddingLeft: '5px'
}

class Title extends Component{
    render() {

        let { title } = this.props;

        return (
            <div style={ initStyle } >{ title }</div>
        )
    }
}

export default Title;