import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Link, hashHistory } from 'react-router';

import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import routes
import routes from '../routes';

//样式
const styles = {
  container: {
    height: "100%"
  },
};

//主题
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#FA0A82',
    accent1Color: deepOrange500,
  },
  fontFamily: 'Roboto, YouYuan, helvetica neue, hiragino sans gb, stheiti, microsoft yahei'
});

class Main extends Component {

  render() {

    const { store, history } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Provider store={store}>
            <Router history={history} routes={routes} />
          </Provider>
        </div>
      </MuiThemeProvider>
    )

  }
  
};

Main.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Main;
