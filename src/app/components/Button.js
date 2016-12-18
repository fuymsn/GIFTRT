import React, { Component } from 'react';
import objectAssign from "object-assign";
Object.assign = objectAssign;

const initStyle = {
    root: {
        backgroundColor: 'rgb(250, 10, 130)',
        cursor: 'pointer',
        boxSizing: 'border-box',
        transform: 'translate(0px, 0px)',
        height: '36px',
        lineHeight: '36px',
        borderRadius: '2px',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        textAlign: 'center',
        display: 'inline-block',
        color: 'rgb(255, 255, 255)',

    },

    buttonText: {
        userSelect: 'none',
        position: 'relative',
        fontSize: '14px',
        letterSpacing: '0px',
        textTransform: 'uppercase',
        fontWeight: '500',
        opacity: 1,
        paddingLeft: '16px',
        paddingRight: '16px',
        margin: '0px',
    }
}

class Button extends Component {
    
    render() {

        let { onTouchTap, label, fullWidth, style, type } = this.props;

        let fullWidthStyle = { width: '100%' };
        let flatStyle = { color: 'rgb(250, 10, 130)', backgroundColor: '#fff' };

        let buttonStyle = Object.assign({}, initStyle.root, style);

        buttonStyle = fullWidth ? Object.assign({}, buttonStyle, fullWidthStyle ): buttonStyle;
        buttonStyle = type == 'flat' ? Object.assign({}, buttonStyle, flatStyle ): buttonStyle;

        return (
            <div style={ buttonStyle } onTouchTap={ onTouchTap } >
                <span style={ initStyle.buttonText }>{ label }</span>
            </div>
        )

    }
}

export default Button;