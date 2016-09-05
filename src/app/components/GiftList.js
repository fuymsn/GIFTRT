import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

class GiftList extends Component{
    render() {

        let { giftList } = this.props;

        return (
            <div style={styles.root}>
                <GridList
                cellHeight={200}
                style={styles.gridList}
                >
                <Subheader>December</Subheader>
                {giftList.map((tile) => (
                    <GridTile
                    key={tile.img}
                    title={tile.title}
                    subtitle={<span>by <b>{tile.author}</b></span>}
                    actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                    >
                    <img src={tile.img} />
                    </GridTile>
                ))}
                </GridList>
            </div>
        );
    }
}

export default GiftList;