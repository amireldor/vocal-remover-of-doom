/**
 * Will show the video search results from the youtube store.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from'redux';

@connect(
  state => ({results: state.youtube.searchResults}),
  dispatch => bindActionCreators({}, dispatch)
)
class YouTubeResults extends Component {
  static propTypes = {
    results: PropTypes.array
  }
  render() {
    const styles = require('./YouTubeResults.scss');
    const listItems = this.props.results.map(item => {
      return (<li className={styles.result}>
              <img className={styles.thumbnail} src={item.snippet.thumbnails.default.url} alt="video thumbnail" />
              {item.snippet.title}
              </li>);
    });

    return (<ul className={styles.theList}>
            {listItems}
            </ul>);
  }
}

export default YouTubeResults;
