import React, { Component } from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui';
//import VAppBar from '../components/VAppBar';
import Icon from '../components/Icon';
import BasicAppBar from '../components/BasicAppBar';
import Common from '../utils/Common';
import MobileAction from '../utils/MobileAction';

import $ from 'jquery';
//import activityList from '../data/activityList';

import * as actions from '../actions';

const style = {
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},

	activityLists: {
		display: 'flex',
		flexDirection: 'column',
		overflow: 'auto',
		flex: 1,
		paddingBottom: 60
	},

	cardItem: {
		margin: '5px 5px 0px 5px'
	},

	cardTitle:{
		fontSize: '20px'
	},

	cardMedia: {
		overflow: 'hidden',
	},
	cardTitleContainer: {
		padding: '5px 15px'
	}
}

const mapStateToProps = (state) => {
	return {
		activityList: state.activity.lists
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
        actions: bindActionCreators(actions, dispatch)
    }
}

class Activity extends Component{
	
	loadActivityListFromServer() {

		let that = this;

		$.ajax({
			url: '/m/activitylist',
			dataType: 'json',
			type: 'GET',
			success: function(ret){
				that.props.actions.updateActivityLists(ret.data);
			},
			error: function(ret){
				console.log(ret.responseText);
			}
		});

		
	}
	
	componentDidMount() {
		this.loadActivityListFromServer();
	}

	handleToDetail(e, id) {
		//阻止默认事件
        e.preventDefault();
		//数据重组
        var json = JSON.stringify({
			dir: 'activity',
			title: '活动1',
			url: '#/activity/' + id
		});

		//执行跳转
        MobileAction.switchPage(json);
	}

	render(){

		let { activityList } = this.props;

		return (
			<div style={ style.container }>
                <BasicAppBar title="活动" />
				<div style={ style.activityLists }>
					{activityList.map((item, index) => (
						<Card 
							style={ style.cardItem }
							key={ item.id }
							onTouchTap={ (e) => this.handleToDetail(e, item.id) }
						>
						    <CardMedia
								style={ style.cardMedia }
						    >
						      <img src={ Common.getActivityBannerImageUrl(item.url) } />
						    </CardMedia>
						    <CardTitle 

								title={ item.title } 
								titleStyle={ style.cardTitle }

								subtitle={ item.init_time }
								style={ style.cardTitleContainer }
								
							/>
						</Card>
					))}

				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);