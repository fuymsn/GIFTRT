import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import * as actions from '../actions';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: 200,
    overflowY: 'auto',
    marginTop: 1,
    marginBottom: 1,
  },
};

const mapStateToProps = (state) => {
    return {
        messages: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

class GiftList extends Component{

    //送礼
    handleSendGift(id) {
        this.props.actions.sendGift(id);
    }

    render() {

        let { giftList } = this.props;

        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={50}
                    style={styles.gridList}
                    cols={5}
                >
                {giftList.map((tile) => (
                    <GridTile
                        key={tile.id}
                        id={tile.id}
                        onTouchTap={ () => this.handleSendGift(tile.id) }
                    >
                        <img src={tile.img} />
                    </GridTile>
                ))}
                </GridList>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftList);