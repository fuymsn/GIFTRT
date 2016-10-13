/**
 * Diamond 组件，显示钻石数量
 * author Young
 * param: value: 钻石数量, style: 根目录样式
 */

import React, { Component } from 'react';

const initStyle = {
    diamondWrapper: {
        display: 'inline-block',
        verticalAlign: 'middle'
    },

    diamondText: {
        fontSize: '13px',
        color: '#fff',
        display: 'inline-block',
        verticalAlign: 'middle'
    },

    diamondIcon: {
        display: 'inline-block',
        verticalAlign: 'middle',
        backgroundImage: 'url(images/diamond.png)',
        width: '18px',
        height: '14px',
        backgroundSize: 'cover',
        position: 'relative',
        marginLeft: '3px',
        top: '-1px'
    }
}

class Diamond extends Component{
    render() {

        let { value, style } = this.props;
        let rootStyle = Object.assign({}, initStyle.diamondWrapper, style);

        return (
            <div style={ rootStyle }>
                <div style={ initStyle.diamondText }>{ value }</div>
                <div style={ initStyle.diamondIcon }></div>
            </div>
        )
    }
}

export default Diamond;