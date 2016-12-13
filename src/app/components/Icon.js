/**
 * Icon 组件，显示按钮icon
 * author: Young
 * param: icon 按钮名称， style 按钮root样式
 * 现有按钮名称：setting, edit
 */

import React, { Component } from 'react';
import objectAssign from "object-assign";
Object.assign = objectAssign;

const initStyle = {
    width: "24px",
    height: "24px",
    backgroundSize: "cover"
}

class Icon extends Component{
    render() {

        let { style, icon, type } = this.props;
        //背景图片
        let backgroundImage = "url(images/" + icon +".png)";
        //icon背景排列
        let iconCommonStyle = { backgroundImage: backgroundImage };
        //appbar头部样式
        let iconStyle = {};

        switch(type){
            case 'logo':
                iconStyle = { height: '30px', width: '30px', position: 'relative', top: '9px' }
                break;
            case 'room':
                iconStyle = { height: '25px', width: '25px', margin: '8px 8px 0 0' }
                break;
            default:
                break;
        }
        
        //reset style
        let styleOption = Object.assign({}, initStyle, iconCommonStyle, iconStyle, style);
        
        return (
            <div style={ styleOption } ></div>
        )
    }
}

export default Icon;