import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/info';

import * as songFileActions from 'redux/modules/songFile';

import {FileInput} from 'components';

const actions = {
  onFileChange: function(event) {
    console.log('hello');
    return songFileActions.loadSongFile('test');
  }
};

const SongSelector = connect(
  state => ({info: state.info.data}),
 dispatch => bindActionCreators(Object.assign({}, load, actions), dispatch)
)(FileInput);

export default SongSelector;
