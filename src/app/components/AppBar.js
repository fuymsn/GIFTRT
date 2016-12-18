import React, { Component } from 'react';

const style = {
    root: {
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        boxSizing: 'border-box',
        color: 'rgb(85, 85, 85)',
        boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
        backgroundColor: 'rgb(250, 10, 130)',
        position: 'relative',
        zIndex: 1100,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        height: 48
    },

    title: {
        userSelect: 'none',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: 0,
        paddingTop: 0,
        letterSpacing: 0,
        fontSize: 24,
        fontWeight: 400,
        height: '48px',
        lineHeight: '48px',
        flex: '1 1 0%',
        textAlign: 'center',
        color: '#fff',
        userSelect: 'none',
        left: '-24px',
        position: 'relative'
    },

    elementLeft: {
        padding: 9
    },

    elementRight: {

    },

    titleArrow: {
        borderWidth: '6px',
        borderStyle: 'solid',
        borderColor: 'rgb(255, 255, 255) transparent transparent transparent',
        /* border-left: transparent; */
        /* border-right: transparent; */
        display: 'block',
        position: 'absolute',
        top: 22,
        right: 8,
        width: 0,
        height: 0
    },

    dropdown: {
        root:{
            position: 'relative',
        },

        panel: {
            transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            boxSizing: 'border-box',
            color: 'rgb(85, 85, 85)',
            boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
            borderRadius: '2px',
            backgroundColor: 'rgb(255, 255, 255)',
            transform: 'scaleY(1)',
            transformOrigin: 'left top 0px',
            position: 'fixed',
            zIndex: 2100,
            maxHeight: '771px',
            overflowY: 'auto',
            top: '48px',
            left: '50%',
            marginLeft: '-75px',
            display: 'none',
            width: '150px'
        },

        item: {
            padding: '15px 20px',
            fontSize: '22px',
            userSelect: 'none',
            color: '#666',
            cursor: 'pointer'
        }


    }
}

function handleRightBtn() {
    window.history.back();
}

class AppBar extends Component {

    constructor() {
        super();
        this.dropdownState = false;
    }

    handleDropDownHead(e) {
        if(!this.dropdownState){
            this.showDropDownPanel();
        }else{
            this.hideDropDownPanel();
        }
    }

    //item方法处理
    handleDropDownItem(event, index, value, callback) {
        let dropdownItem = this.refs['dropdownItem' + index];
        let dropdownTitle = this.refs.dropdownTitle;
        //console.log(dropdownItem.innerHTML);
        dropdownTitle.innerHTML = dropdownItem.innerHTML;
        this.hideDropDownPanel();
        callback(event, index, value);
    }

    showDropDownPanel() {
        let dropdownPanel = this.refs.dropdownPanel;
        dropdownPanel.style.display = 'block';
        dropdownPanel.style.opacity = '1';
        this.dropdownState = true;
    }

    hideDropDownPanel() {
        let dropdownPanel = this.refs.dropdownPanel;
        dropdownPanel.style.display = 'none';
        dropdownPanel.style.opacity = '0';
        this.dropdownState = false;
    }

    render() {

        let { elementLeft, elementRight, title, titleType, onChange } = this.props;
        let initTitle = null;

        //title 文字
        let titleHead = <h1 style={ style.title }>{ title }</h1>;

        //title 元素
        let titleElement = <div style={ style.dropdown.root }>
                                <h1 style={ style.title } ref='dropdownTitle' onTouchTap={ (e)=> { this.handleDropDownHead(e) } }>
                                    { title }
                                </h1>
                                <span style={ style.titleArrow }></span>
                                <div style={ style.dropdown.panel } ref='dropdownPanel'>
                                    <div value={0} ref='dropdownItem0' style={ style.dropdown.item } onTouchTap={ (e)=> { this.handleDropDownItem(e, 0, 0, onChange) } }>主播排行榜</div>
                                    <div value={1} ref='dropdownItem1' style={ style.dropdown.item } onTouchTap={ (e)=> { this.handleDropDownItem(e, 1, 1, onChange) } }>富豪排行榜</div>
                                </div>
                            </div>;
        
        switch(titleType){
            case 'text':
                initTitle = titleHead;
                break;
            case 'dropdown':
                initTitle = titleElement;
                break;
            default:
                initTitle = titleHead;
        }

        return (
            <div style={ style.root }>
                <div style={ style.elementLeft }>{ elementLeft }</div>

                <div>{ initTitle }</div>

                <div style={ style.elementRight }>{ elementRight}</div>
            </div>
        )
    }
}

export default AppBar;