/**
 * LevelRich 组件: 财富等级图标
 * author Young
 * param: level: 财富等级, style: 根目录样式
 */

import React, { Component } from 'react';

require("../../www/style/icon.less");

const initStyle = {
    display: 'inline-block',
    verticalAlign: 'middle'
}

class LevelRich extends Component{

    render() {
        
        let { level, style } = this.props;
        let styleOption = Object.assign({}, initStyle, style);
        let levelClass = level? 'iconLevel richLevel' + level : '';

        return (
            <div className={ levelClass } style={ styleOption }></div>
        )
    }
}

export default LevelRich;