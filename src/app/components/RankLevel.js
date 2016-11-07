/**
 * RankLevel 组件: 排行榜数字图标
 * author Young
 * param: level: 排行榜索引, style: 根目录样式
 */

import React, { Component } from 'react';

require("../../www/style/icon.less");

const initStyle = {
    //display: 'inline-block',
    //verticalAlign: 'middle'
    root: {
        color: '#666',
        width: 50,
        textAlign: 'center'
    },

    no1: {
        backgroundImage: 'url(images/rank-1.png)',
        backgroundSize: 'contain',
        textIndent: '-999px',
        height: 25,
        width: 25,
        left: 12,
    },

    no2: {
        color: '#56a2fb',
        fontWeight: 'bold'
    },
    
    no3: {
        color: '#f5a623',
        fontWeight: 'bold'
    }
}

class RankLevel extends Component{

    render() {
        
        let { level, style } = this.props;

        //icon类型判断
        let numStyle = {};

        switch(level){
            case 0:
                numStyle = initStyle.no1;
                break;
            case 1:
                numStyle = initStyle.no2;
                break;
            case 2:
                numStyle = initStyle.no3;
                break;
        }

        let styleOption = Object.assign({}, initStyle.root, numStyle, style);

        return (
            <div style={ styleOption }>No.{ level+1 }</div>
        )
    }
}

export default RankLevel;