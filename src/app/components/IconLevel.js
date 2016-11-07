/**
 * IconLevel 组件: 财富等级图标
 * author Young
 * param: level: 财富等级, style: 根目录样式, type: 类型（rich财富等级，anchor主播等级，vip贵族）
 */

import React, { Component } from 'react';

require("../../www/style/icon.less");

const initStyle = {
    //display: 'inline-block',
    //verticalAlign: 'middle'
}

class IconLevel extends Component{

    render() {
        
        let { level, style, type } = this.props;

        let styleOption = Object.assign({}, initStyle, style);

        //icon类型判断
        let typeClass = '';

        switch(type){
            case 'rich':
                typeClass = 'iconLevel richLevel';
                break;
            case 'anchor':
                typeClass = 'iconLevel anchorLevel';
                break;
            case 'vip':
                typeClass = 'iconLevel vipLevel';
                break;
        }

        //icon Class组装
        let levelClass = level? typeClass + level : '';

        return (
            <div className={ levelClass } style={ styleOption }></div>
        )
    }
}

export default IconLevel;