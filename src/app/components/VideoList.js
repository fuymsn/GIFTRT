import React, { Component } from 'react';
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
    width: 480,
    //height: 500,
    overflowY: 'auto',
    marginBottom: 5,
  }
};

class VideoList extends Component {

    handleVideoTap(id) {
        location.href = '#/video/' + id;
    }

    loadVideoListFromServer() {
        // $.get("", function(){

        // });
    }

    componentDidMount() {
        this.loadVideoListFromServer();
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
                            key={tile.img}
                            title={tile.title}
                            subtitle={<span>by <b>{tile.author}</b></span>}
                            onTouchTap={ () => { this.handleVideoTap(tile.id) }}
                            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                            >
                            <img src={tile.img} />
                        </GridTile>
                    ))}
                </GridList>
            </div>
        )
    }

}

export default VideoList;