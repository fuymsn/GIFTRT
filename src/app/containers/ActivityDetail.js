import React, { Component } from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VAppBar from '../components/VAppBar';

import activityList from '../data/activityList';

import * as actions from '../actions';

const style = {
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},

    ActivityDetail: {
        width: '100%'
    }
}

const mapStateToProps = (state) => {
	return {
		activityList: state.activity.activityList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
        actions: bindActionCreators(actions, dispatch)
    }
}

class ActivityDetail extends Component{
	
	loadActivityListFromServer() {
		this.props.actions.updateActivityLists(activityList);
	}

	componentDidMount() {
		this.loadActivityListFromServer();
	}

	render(){

		return (
			<div style={ style.container }>
				<VAppBar title='女神降临' />
				<div>
				    <img src='../images/activity/a2.png' style={ style.ActivityDetail }/>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);