import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const actions = {
};

@connect(
  state => ({
    url: state.song.streamUrl
  }),
  dispatch => bindActionCreators(Object.assign({}, actions), dispatch)
)
class PlayerControls extends Component {
  static propTypes = {
    url: PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      url: this.props.url
    };
  }

  onInputChange(event) {
    this.setState({url: event.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" ref="streamURL" value={this.state.url} />
      </div>
    );
  }
}

export default PlayerControls;
