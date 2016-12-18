import React, { Component } from 'react';
import objectAssign from "object-assign";
Object.assign = objectAssign;

const style = {
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },

    bar: {
        width: '100%',
        backgroundColor: 'rgb(255, 255, 255)',
        whiteSpace: 'nowrap',
        display: 'flex',
        justifyContent: 'space-around',
        height: '50px'
    },

    barItem: {
        lineHeight: '50px',
        fontSize: '14px',
        userSelect: 'none',
        cursor: 'pointer',
        color: '#555',
        textAlign: 'center',
        fontWeight: 'normal'
    },

    barItemActive: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'rgb(250, 10, 130)'
    },

    tab: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        overflowY: 'scroll'
    },

    tabItem: {
        height: '0px',
        overflow: 'hidden',
    },

    tabItemActive: {
        height: 'initial',
        overflow: 'initial'
    }
}

class Tabs extends Component {

    constructor() {
        super();
        this.barItemValue = 0;
    }
    //barItem 激活状态
    activeBarItem() {
        let barItem = this.refs['barItem' + this.barItemValue];
        Object.assign(barItem.style, style.barItem, style.barItemActive);
    }

    //barItem 取消激活状态
    removeActiveBarItem(value) {
        let barItem = this.refs['barItem' + this.barItemValue];
        Object.assign(barItem.style, style.barItem);
    }

    //active tabItem
    activeTabItem() {
        let tabItem = this.refs.tab.childNodes[this.barItemValue];
        Object.assign(tabItem.style, style.tabItem, style.tabItemActive);
    }

    //removeActive tabItem
    removeActiveTabItem() {
        let tabItem = this.refs.tab.childNodes[this.barItemValue];
        Object.assign(tabItem.style, style.tabItem);
    }

    //barItem 事件处理
    handleBarItem(event, value, callback) {
        this.removeActiveBarItem();
        this.removeActiveTabItem();

        this.barItemValue = value;

        this.activeBarItem();
        this.activeTabItem();

        callback(value);
    }

    render() {

        let tabs = this.props.children;
        let { value, onChange } = this.props;

        this.barItemValue = value;
        
        let tabsLength = tabs.length;
        let barItemWidth = 100/tabsLength;
        let barItemStyle = Object.assign({}, style.barItem, {width: barItemWidth + '%'});
        let barItemInitStyle = {};

        //bar 组装
        let bar = tabs.map((tab) => {
            //声明value值
            let barItemValue = tab.props.value;
            value == barItemValue ? (barItemInitStyle = Object.assign({}, barItemStyle, style.barItemActive)) : (barItemInitStyle = Object.assign({}, barItemStyle));

            return (
                <div 
                    style={ barItemInitStyle }
                    value={ tab.props.value }
                    key={ tab.props.value }
                    ref={ 'barItem' + barItemValue }
                    onTouchTap={(e) => { this.handleBarItem(e, barItemValue, onChange) }}
                >{ tab.props.label }</div>
            )
        });

        // this.refs.tab.childNodes.map((tab) => {
        //     Object.assign(tab.style, style.tabItemActive);
        // });

        //返回模板
        return (
            <div style={ style.root }>
                <div style={ style.bar } ref="bar">{ bar }</div>
                <div style={ style.tab } ref="tab">{ this.props.children }</div>
            </div>
        )
    }
}

export default Tabs;