
import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as playerControls from 'redux/modules/playerControls';

const actions = {
  onPause: () => {
    return playerControls.pause();
  },
  onPlay: () => {
    return playerControls.play();
  }
};

@connect(
  state => ({
    status: state.playerControls.status
  }),
  dispatch => bindActionCreators(Object.assign({}, actions), dispatch)
)
class PlayerControls extends Component {
  static propTypes = {
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    status: PropTypes.string
  }

  onPlayPauseClick() {
    console.log(this);
    switch (this.props.status) {
      case playerControls.PLAYING:
        this.props.onPause();
        break;
      default:
        this.props.onPlay();
        break;
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.onPlayPauseClick.bind(this)}>{this.props.status !== playerControls.PLAYING ? 'Play' : 'Pause'}</button>
      </div>
    );
  }
}

export default PlayerControls;
