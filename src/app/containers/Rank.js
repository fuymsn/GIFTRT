import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Tabs, Tab} from "material-ui/Tabs";
import {AppBar, DropDownMenu, MenuItem, IconButton} from "material-ui";
import SwipeableViews from "react-swipeable-views";
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
            userSelect: 'none'
        }
    },
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
        this.RANK_CATS = ['day', 'week', 'month', 'his'];
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

        let tabsStyle = {
            backgroundColor: this.context.muiTheme.palette.white
        }

        let tabStyle = {
            color: this.context.muiTheme.palette.textColor,
            fontWeight: 'bold'
        }

        return (
            <div style={ style.container }>
                <AppBar
                    title={
                        <DropDownMenu
                            value={ dropDownValue }
                            onChange={ (event, index, value) => {
                                this.handleDropDown(event, index, value)
                            } }
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
                />
                <Tabs
                    onChange={ (slideIndex) => {
                        this.handleTabs(slideIndex)
                    } }
                    value={ slideIndex }
                    tabItemContainerStyle={ tabsStyle }
                >
                    <Tab label="日榜" value={0} style={ tabStyle }/>
                    <Tab label="周榜" value={1} style={ tabStyle }/>
                    <Tab label="月榜" value={2} style={ tabStyle }/>
                    <Tab label="总榜" value={3} style={ tabStyle }/>
                </Tabs>
                <SwipeableViews
                    index={ slideIndex }
                    onChangeIndex={ (slideIndex) => {
                        this.handleChange(slideIndex)
                    } }
                    style={ style.rankList }
                    disabled={ true }
                    animateTransitions={false}
                >
                { this.RANK_CATS.map((cat)=> {
                    return <RankList 
                        key={ this.RANK_TYPES[dropDownValue] + cat }
                        anchorList={ anchorLists[this.RANK_TYPES[dropDownValue] + cat] } />
                })}
                </SwipeableViews>
            </div>
        );
    }

}

Rank.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Rank);
