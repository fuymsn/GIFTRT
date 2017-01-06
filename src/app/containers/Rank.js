import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
//import {Tabs, Tab} from "material-ui/Tabs";
import Tabs from '../components/Tabs';
import AppBar from "../components/AppBar";
import RankList from "../components/RankList";
import Icon from "../components/Icon";
import * as actions from "../actions";

//actions
//样式
const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    rankList: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    dropDownMenu: {
        root: { 
            display: "block", 
            margin: "0px auto",
            height: 48,
            width: '162px'
        },

        //dropdown 下划线
        underlineStyle: {
            border: 0
        },

        //dropdown 字体颜色
        labelStyle: {
            color: '#fff',
            lineHeight: '48px',
            fontSize: '24px',
            padding: 0,
            userSelect: 'none',
            WebkitUserSelect: 'none',
        }
    },

    tabs: {
        root: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1
        },

        tabItemContainerStyle: {
            backgroundColor: '#fff',
            display: 'block'
        },
        
        contentContainerStyle: {
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },

        //tab的样式
        tabStyle: {
            color: '#555',
            fontWeight: 'bold'
        },
    }

};

const mapStateToProps = (state) => {
    return {
        dropDownValue: state.rank.dropDownValue,
        slideIndex: state.rank.slideIndex,
        anchorLists: state.rank.anchorLists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

//主题
class Rank extends Component {
    constructor() {
        super();
        this.RANK_TYPES = {0: 'rank_exp_', 1: 'rank_rich_'};
        this.RANK_CATS = [{
            cat: 'day',
            title: '日榜',
            index: 0,
        }, {
            cat: 'week',
            title: '周榜',
            index: 1,
        }, {
            cat: 'month',
            title: '月榜',
            index: 2,
        }, {
            cat: 'his',
            title: '总榜',
            index: 3
        }];
    }

    handleTabs(value) {
        this.props.actions.setRankTabIndex(value);
    };

    handleDropDown(event, index, value) {
        this.props.actions.changeRankDropDownValue(value);
    };

    loadAnchorRankFromServer() {
        this.props.actions.fetchAnchorRank();
    };

    componentDidMount() {
        this.loadAnchorRankFromServer();
    };

    render() {

        let {dropDownValue, slideIndex, anchorLists} = this.props;

        let tabStyleActive = {
            height: 'initial',
            overflow: 'initial'
        }

        let tabStyle = {
            height: '0px',
            overflow: 'hidden'
        }

        return (
            <div style={ style.container }>
                <AppBar 
                    title="主播排行榜" 
                    titleType="dropdown"
                    elementLeft={
                        <Icon icon="logo-white" type="logo"/>
                    }
                    onChange={(event, index, value) => {
                        this.handleDropDown(event, index, value)
                    }}
                />
                {/* <AppBar
                    title={
                        <DropDownMenu
                            value={ dropDownValue }
                            onChange={(event, index, value) => {
                                this.handleDropDown(event, index, value)
                            }}
                            underlineStyle={ style.dropDownMenu.underlineStyle }
                            labelStyle={ style.dropDownMenu.labelStyle }
                            style={ style.dropDownMenu.root }
                            autoWidth={ true }
                        >
                            <MenuItem value={0} primaryText="主播排行榜"/>
                            <MenuItem value={1} primaryText="富豪排行榜"/>
                        </DropDownMenu>
                    }
                    iconElementLeft={
                        <Icon icon="logo-white" type="logo"/>
                    }
                /> */}
                {/*<Tabs
                    onChange={ (slideIndex) => { this.handleTabs(slideIndex) }}
                    value={ slideIndex }
                    style={ style.tabs.root }
                    inkBarStyle={{ transition:'none' }}
                    contentContainerStyle={ style.tabs.contentContainerStyle }
                    tabItemContainerStyle={ style.tabs.tabItemContainerStyle }
                >
                    { this.RANK_CATS.map((item)=> {
                        return <Tab label={item.title} value={item.index} style={ style.tabs.tabStyle } key={item.index}>
                            <RankList 
                                anchorList={ anchorLists[this.RANK_TYPES[dropDownValue] + item.cat] } />
                        </Tab>
                    })}
                </Tabs>*/}
                <Tabs 
                    value={ slideIndex }
                    onChange={(slideIndex) => {
                        this.handleTabs(slideIndex);
                    }} >
                    { this.RANK_CATS.map((item, index)=> {
                        return <div label={item.title} value={item.index} style={ index == slideIndex ? tabStyleActive: tabStyle } key={item.index}>
                            <RankList 
                                anchorList={ anchorLists[this.RANK_TYPES[dropDownValue] + item.cat] } />
                        </div>
                    })}
                </Tabs>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Rank);
