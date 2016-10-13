import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {List, ListItem} from 'material-ui/List';
import {AppBar, DropDownMenu, MenuItem, IconButton, FlatButton, Toggle} from "material-ui";
import IconChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import BasicAppBar from "../components/BasicAppBar";

import * as actions from "../actions";
<i class="material-icons">chevron_right</i>
//actions
//样式
const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    list:{
        marginTop: '10px'
    },
    listItem: {
        backgroundColor: '#fff'
    },
    clearButton: {
        margin: '6px 6px 0px 0px'
    }
};

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

//主题
class Setting extends Component {
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

        return (
            <div style={ style.container }>
                <List style={ style.list }>
                    <ListItem 
                        primaryText="消息提醒" 
                        rightToggle={<Toggle /> }
                        style={ style.listItem }
                        disabled={true} 
                    />
                </List>
                <List style={ style.list }>
                    <ListItem 
                        primaryText="清除缓存" 
                        rightIconButton={ <FlatButton primary={true} label="立即清除" style={ style.clearButton }/>}  
                        style={ style.listItem }
                        disabled={true} 
                    />
                </List>
                <List style={ style.list }>
                    <ListItem primaryText="条款" rightIcon={<IconChevronRight />}  style={ style.listItem }/>
                    <ListItem primaryText="关于" rightIcon={<IconChevronRight />}  style={ style.listItem }/>
                </List>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
