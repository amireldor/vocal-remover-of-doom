import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as songActions from 'redux/modules/song';

@connect(
  state => ({
    url: state.song.streamUrl
  }),
  dispatch => bindActionCreators(songActions, dispatch)
)
class PlayerControls extends Component {
  static propTypes = {
    url: PropTypes.string,
    loadSongStream: PropTypes.func.isRequired
  }
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <input type="text" ref="streamURL" value={this.props.url} onChange={(event) => this.props.loadSongStream(event.target.value)} />
      </div>
    );
  }
}

export default PlayerControls;
