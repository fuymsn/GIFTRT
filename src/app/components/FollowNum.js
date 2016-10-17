/**
 * FollowNum 组件，显示关注者数量
 * author Young
 * param: value: 钻石数量, style: 根目录样式
 */

import React, { Component } from 'react';

const initStyle = {
    diamondWrapper: {
        //display: 'inline-block',
        //verticalAlign: 'middle'
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
        backgroundImage: 'url(images/follow.png)',
        width: '12px',
        height: '12px',
        backgroundSize: 'cover',
        position: 'relative',
        marginRight: '3px',
        top: '-1px'
    }
}

class FollowNum extends Component{
    render() {

        let { value, style, textStyle } = this.props;
        let rootStyle = Object.assign({}, initStyle.diamondWrapper, style);
        let diamondText = Object.assign({}, initStyle.diamondText, textStyle );
        return (
            <div style={ rootStyle }>
                <div style={ initStyle.diamondIcon }></div>
                <div style={ diamondText }>{ value }</div>
            </div>
        )
    }
}

export default FollowNum;