import React, { Component } from 'react';
import objectAssign from "object-assign";
Object.assign = objectAssign;
/**
 * 主播封面组件
 */
const initStyle = {
    height: 'auto',
    transform: 'translateY(-50%)',
    WebkitTransform: 'translateY(-50%)', //解决android 4.4 显示问题
    position: 'relative',
    left: '0px',
    width: '100%',
    top: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
}

class VideoCover extends Component {
    
    render() {

        let { backgroundUrl, style } = this.props;
        let backgroundStyle = { backgroundImage: 'url('+ backgroundUrl +')' };
        let coverStyle = Object.assign({}, initStyle, style, backgroundStyle);
        return (
            <div style={ coverStyle }>{ this.props.children }</div>
        );
    }

}

export default VideoCover;