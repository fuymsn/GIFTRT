import React, { Component } from 'react';
import { connect } from 'react-redux';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import $ from 'jquery';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    //height: 500,
    overflowY: 'auto',
    marginBottom: 5,
  }
};

const mapStateToProps = (state) => {
    return {
        instances: state.instances
    }
}

class VideoList extends Component {

    handleVideoTap(id) {
        //location.href = '#/video/' + id;
    }

    //设置视频背景图片
    getVideoImageUrl(userID, imageID) {
        let { instances } = this.props;
        return /\d{13}/.test(imageID) ? (instances.PIC_PATH + "/images/anchorimg/" + userID + "_" + imageID.match(/\d{13}/)[0] + ".jpg") : instances.PIC_PATH + '/images/vzhubo.jpg'
    }

    render() {

        let { videoLists } = this.props;

        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={150}
                    style={styles.gridList}
                    >
                    {videoLists.map((tile) => (
                        <GridTile
                            key={tile.uid}
                            title={tile.username}
                            subtitle={<span><b>{tile.live_time}</b></span>}
                            onTouchTap={ () => { this.handleVideoTap(tile.id) }}
                            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                            >
                            <img src={ this.getVideoImageUrl(tile.uid, tile.headimg)} />
                        </GridTile>
                    ))}
                </GridList>
            </div>
        )
    }

}

export default connect(mapStateToProps, null)(VideoList);