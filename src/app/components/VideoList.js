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
    justifyContent: 'space-around',
  },
  gridList: {
    width: 480,
    //height: 500,
    overflowY: 'auto',
    marginBottom: 5,
  },

  videoItem: {
    //overflow: 'hidden'
  }
};

const tilesData = [
  {
    img: 'images/z1.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/z2.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'images/z3.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'images/z4.jpg',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'images/z5.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'images/z6.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'images/z7.jpg',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'images/z8.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
  {
    img: 'images/z9.jpg',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'images/z10.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

class VideoList extends Component {

    handleVideoTap() {
        location.href = '#/';
    }

    loadVideoListFromServer() {
        // $.get("", function(){

        // });
    }

    componentDidMount() {
        this.loadVideoListFromServer();
    }

    render() {
        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={150}
                    style={styles.gridList}
                    >
                {tilesData.map((tile) => (
                    <GridTile
                        key={tile.img}
                        title={tile.title}
                        subtitle={<span>by <b>{tile.author}</b></span>}
                        onTouchTap={ (e) => { this.handleVideoTap(e) }}
                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                        style={ styles.videoItem }
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