import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';  // eslint-disable-line id-length

import * as songActions from 'redux/modules/song';

const SEARCH_WAIT_TIME = 457;  // Milliseconds

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
    // A function to start searching YouTube after some text was entered without flooding stuff
    this.startYouTubeSearch = _.debounce(this._startYouTubeSearch, SEARCH_WAIT_TIME);
  }

  onInputBoxChange(event) {
    const text = event.target.value;
    this.setState({ searchTerm: text });
    this.startYouTubeSearch(text);
  }

  // Don't call this! Call it without the '_'
  _startYouTubeSearch(searchTerm) {
    console.log('YOTUBE:', searchTerm);
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
