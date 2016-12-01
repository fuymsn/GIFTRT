/**
 * Diamond 组件，显示钻石数量
 * author Young
 * param: value: 钻石数量, style: 根目录样式
 */

import React, { Component } from 'react';
import objectAssign from "object-assign";
Object.assign = objectAssign;

const initStyle = {
    diamondWrapper: {
        // display: 'inline-block',
        // verticalAlign: 'middle'
        display: 'flex',
        alignItems: 'center'
    },

    diamondText: {
        fontSize: '13px',
        lineHeight: '13px',
        color: '#fff',
    },

    diamondIcon: {
        backgroundImage: 'url(images/diamond.png)',
        width: '18px',
        height: '13px',
        backgroundSize: 'cover',
        position: 'relative',
        marginLeft: '3px',
        top: '-1px'
    }
}

class Diamond extends Component{
    render() {

        let { value, style, textStyle } = this.props;
        let rootStyle = Object.assign({}, initStyle.diamondWrapper, style);
        let diamondText = Object.assign({}, initStyle.diamondText, textStyle );
        return (
            <div style={ rootStyle }>
                <div style={ diamondText }>{ value }</div>
                <div style={ initStyle.diamondIcon }></div>
            </div>
        )
    }
}

export default Diamond;