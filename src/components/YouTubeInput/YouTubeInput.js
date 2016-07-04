import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as songActions from 'redux/modules/song';

@connect(
  state => ({}),  // eslint-disable-line no-unused-vars <-- TMEPORARY
  dispatch => bindActionCreators(songActions, dispatch)
)
class PlayerControls extends Component {
  static propTypes = {
  }
  constructor() {
    super();
    this.state = {
      searchTerm: ''
    };
  }

  onInputBoxChange(event) {
    const text = event.target.value;
    console.log(text);
    this.setState({ searchTerm: text });
  }

  render() {
    return (
      <div>
        <input type="text" ref="inputBox" placeholder="Type to search YouTube..."
               onChange={this.onInputBoxChange.bind(this)} value={this.state.searchTerm} />
      </div>
    );
  }
}

export default PlayerControls;
