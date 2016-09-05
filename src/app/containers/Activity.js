import React, { Component } from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import VAppBar from '../components/VAppBar';

import activityList from '../data/activityList';

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
		flex: 1
	},

	cardItem: {
		margin: '15px'
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
		activityList: state.activity.activityList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
        actions: bindActionCreators(actions, dispatch)
    }
}

class Activity extends Component{
	
	loadActivityListFromServer() {
		this.props.actions.updateActivityLists(activityList);
	}

	componentDidMount() {
		this.loadActivityListFromServer();
	}

	handleToDetail(id) {
		location.href = '#/activity/' + id
	}

	render(){

		let { activityList } = this.props;

		return (
			<div style={ style.container }>
				<VAppBar title='活动' />
				<div style={ style.activityLists }>
					{activityList.map((item, index) => (
						<Card 
							style={ style.cardItem }
							key={ item.image }
							onTouchTap={ () => this.handleToDetail(item.id) }
						>
						    <CardMedia
								style={ style.cardMedia }
						    >
						      <img src={ item.image} />
						    </CardMedia>
						    <CardTitle 

								title={ item.title } 
								titleStyle={ style.cardTitle }

								subtitle={ item.subtitle }
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