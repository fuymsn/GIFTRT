/**
 * Avatar 组件: 头像
 * author Young
 * param: src: 图片id, size: 尺寸
 */

import React, { Component } from 'react';
import {connect} from "react-redux";
import objectAssign from "object-assign";
Object.assign = objectAssign;

const initStyle = {
    userSelect: 'none',
    color: '#fff',
    backgroundColor: 'rgb(188, 188, 188)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    borderRadius: '50%',
    height: '40px', //默认尺寸40
    width: '40px',
}

function mapStateToProps(state){
    return {
        avatarPath: state.instances.AVATAR_PATH
    }
}

class Avatar extends Component{

    render() {
        
        let { size, src, style, avatarPath } = this.props;
        let sizeStyle = {};
        let imageSrc = "";

        size ? sizeStyle = { height: size + 'px', width: size + 'px'}: sizeStyle ={};
        //如果图片id为"" 则显示默认图片
        src == "" ? imageSrc = "images/avatar.png" : imageSrc = avatarPath + '/' + src;

        let styleOption = Object.assign({}, initStyle, sizeStyle, style);


        return (
            <img src={ imageSrc } style={ styleOption }/>
        )
    }
}

export default connect(mapStateToProps, null)(Avatar);