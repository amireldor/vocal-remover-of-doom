import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';  // eslint-disable-line id-length

import * as YouTubeActions from 'actions/YouTubeActions';

const SEARCH_WAIT_TIME = 457;  // Milliseconds

const actions = {
  youTubeSearch: YouTubeActions.search
};

@connect(
  state => ({}),  // eslint-disable-line no-unused-vars
  dispatch => bindActionCreators(actions, dispatch)
)
class PlayerControls extends Component {
  static propTypes = {
    youTubeSearch: PropTypes.func
  };
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
    console.log('props', this.props);
    this.props.youTubeSearch(searchTerm);
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
