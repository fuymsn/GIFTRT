/**
 * Icon 组件，显示按钮icon
 * author: Young
 * param: icon 按钮名称， style 按钮root样式
 * 现有按钮名称：setting, edit
 */

import React, { Component } from 'react';

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
        let iconStyle = { backgroundImage: backgroundImage };
        //appbar头部样式
        let logoStyle = type == "logo" ? { height: '30px', width: '30px', position: 'relative', top: '9px' } : {};
        //reset style
        let styleOption = Object.assign({}, initStyle, iconStyle, logoStyle, style);
        
        return (
            <div style={ styleOption } ></div>
        )
    }
}

export default Icon;