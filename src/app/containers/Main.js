import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Link, hashHistory } from 'react-router';

import routes from '../routes';

//样式
const styles = {
  container: {
    height: "100%"
  },
};

//主题
// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: '#FA0A82',
//     primary2Color: '',
//     //primary3Color: '#eee',
//     accent1Color: '#FA0A82',
//     textColor: '#555',
//     white: '#fff'
//   },
//   fontFamily: 'Arial, YouYuan, helvetica neue, hiragino sans gb, stheiti, microsoft yahei'
// });

class Main extends Component {

  render() {

    const { store, history } = this.props;

    return (
        <div style={styles.container}>
          <Provider store={store}>
            <Router history={history} routes={routes} />
          </Provider>
        </div>
    )

  }
  
};

Main.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Main;
