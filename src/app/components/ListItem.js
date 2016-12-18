import React, { Component } from 'react';
import objectAssign from "object-assign";
Object.assign = objectAssign;

const initStyle = {
    root: {
        fontSize: '16px',
        textDecoration: 'none',
        boxSizing: 'border-box',
        transform: 'translate(0px, 0px)',
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(85, 85, 85)',
        lineHeight: '16px',
        position: 'relative',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between'
    },

    label: {
        marginLeft: '0px',
        padding: '16px 56px 16px 16px',
        position: 'relative'
    },

    iconRight: {

    }
}

class ListItem extends Component {

    render() {

        let { label, disabled, style, elementRight, iconRight, onTouchTap } = this.props;
        let listItemStyle = Object.assign( {}, initStyle.root, style );
        let disabledStyle = { cursor: 'initial' }

        listItemStyle = disabled ? Object.assign({}, listItemStyle, disabledStyle) : listItemStyle;

        return (
            <div 
                style={ listItemStyle } 
                onTouchTap={ onTouchTap }
            >
                <div style={ initStyle.label }>{ label }</div>
                { elementRight && <div style={ initStyle.elementRight }>{ elementRight }</div> }
                { iconRight && <div style={ initStyle.iconRight }>{ iconRight }</div> }
            </div>
        )
    }
}

export default ListItem;