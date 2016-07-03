/**
 * This is a true false file input HTML element.
 * It's a button with a hidden real file input element so it becomes
 * pretty and beautiful
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {load} from 'redux/modules/info';

import * as songActions from 'redux/modules/song';

@connect(
  state => ({
    songType: state.song.songType,
    fileName: state.song.fileName
  }),
  dispatch => bindActionCreators(songActions, dispatch)
)
export default class FileInput extends Component {
  static propTypes = {
    loadSongFile: PropTypes.func.isRequired,
    fileSelected: PropTypes.bool,
    fileName: PropTypes.string,
    songType: PropTypes.string
  }

  render() {
    const styles = require('./FileInput.scss');
    return (
      <div>
        <button className={styles.button} onClick={() => this.refs.fileInput.click()}>
          Browse for file...
        </button>
        <input className={styles.inputElement} type="file" ref="fileInput"
               onChange={(event) => this.props.loadSongFile(event.target.files[0])} />
        <span className={styles.fileName}>{this.props.fileName}</span>
      </div>
    );
  }
}
