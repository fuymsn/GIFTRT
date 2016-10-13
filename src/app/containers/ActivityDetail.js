import React, { Component } from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import $ from 'jquery';

import BackAppBar from '../components/BackAppBar';
import Common from '../utils/Common';

//import activityList from '../data/activityList';

import * as actions from '../actions';

const style = {
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},

    ActivityDetail: {
        width: '100%',
		display: 'block'
    }
}

const mapStateToProps = (state) => {
	return {
		detailLists: state.activity.detailLists
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
        actions: bindActionCreators(actions, dispatch)
    }
}

class ActivityDetail extends Component{
	
	loadActivityListFromServer() {

		let activityId = this.props.params.id;
		let that = this;

		$.ajax({
			url: '/m/activitydetail/' + activityId,
			dataType: 'json',
			data: 'get',
			success: function(ret){
				console.log(ret);
				that.props.actions.updateActivityDetails(ret);
			},

			error: function(ret){
				console.log(ret.responseText);
			}
		});

	}

	componentDidMount() {
		this.loadActivityListFromServer();
	}

	render(){

		let { detailLists } = this.props;
		let common = new Common();
		let detail = [];

		if(!detailLists || !detailLists.url ){ return null; }

		for (var i = 0; i < detailLists.url.length; i++) {
			if(i == 0) { continue; }
			detail.push(<img key={i} src={common.getActivityBannerImageUrl(detailLists.url[i])} style={ style.ActivityDetail }/>);	
		}

		return (
			<div style={ style.container }>
				{/*<BackAppBar title='女神降临' />*/}
				<div>
					{ detail }
				</div>
			</div>
		);
		

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);