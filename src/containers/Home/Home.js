import React, { Component } from 'react';
// import { Link } from 'react-router';
// import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="container">
          Hi.
        </div>
      </div>
    );
  }
}
