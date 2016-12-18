import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon from '../components/Icon';
import AppBar from '../components/AppBar';
import Common from '../utils/Common';
import MobileAction from '../utils/MobileAction';

import * as actions from '../actions';

const style = {
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},

	activityContainer: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		paddingBottom: 60
	},

	activityLists: {
		overflow: 'auto'
	},

	cardItem: {
		margin: '5px 5px 0px 5px',
		borderRadius: 3,
		backgroundColor: '#fff',
		border: '1px solid #eee'
	},

	cardTitle:{
		padding: '5px 0px',
		fontSize: '20px'
	},

	cardMedia: {
		//overflow: 'hidden'
	},
	cardInfo: {
		padding: '5px 10px'
	},
	cardImage: {
		width: '100%',
		display: 'block',
		borderRadius: '4px 4px 0px 0px'
	},
	cardSubtitle: {
		padding: '5px 0px',
		color: '#ccc'
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

		//let that = this;
		this.props.actions.fetchActivityList();

		// $.ajax({
		// 	url: '/m/activitylist',
		// 	dataType: 'json',
		// 	type: 'GET',
		// 	success: function(ret){
		// 		that.props.actions.updateActivityLists(ret.data);
		// 	},
		// 	error: function(ret){
		// 		console.log(ret.responseText);
		// 	}
		// });

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
                <AppBar title="活动" elementLeft={
                    <Icon icon="logo-white" type="logo"/>
                } />
				<div style={ style.activityContainer }>
					<div style={ style.activityLists }>
						{activityList.map((item, index) => (
							<div 
								style={ style.cardItem }
								key={ item.id }
								data-id={item.id}
								onTouchTap={ (e) => this.handleToDetail(e, item.id) }
							>
								<div style={ style.cardMedia }>
								<img style={ style.cardImage } src={ Common.getActivityBannerImageUrl(item.url) } />
								</div>
								<div style={ style.cardInfo }>
									<div style={ style.cardTitle }>{ item.title }</div>
									<div style={ style.cardSubtitle }>{ item.init_time }</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);