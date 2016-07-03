/**
 * TODO: should probably be a single component which is  `connected()`
 * instead of a pair of container and components like redux wants. This is
 * how the creator of the redux-example did it.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/info';

import * as songFileActions from 'redux/modules/songFile';

import {FileInput} from 'components';

const actions = {
  onFileChange: (event) => {
    console.log('SONG SELECTOR container', event.target.files[0]);
    return songFileActions.loadSongFile(event.target.files[0]);
  }
};

const SongSelector = connect(
  state => ({
    info: state.info.data,
    fileSelected: state.songFile.fileSelected,
    fileName: state.songFile.fileName
  }),
  dispatch => bindActionCreators(Object.assign({}, load, actions), dispatch)
)(FileInput);

export default SongSelector;
