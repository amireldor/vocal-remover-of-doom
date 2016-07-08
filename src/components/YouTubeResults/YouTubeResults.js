/**
 * Will show the video search results from the youtube store.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from'redux';

// import * as songActions from 'redux/modules/song';
import {loadSongYouTube} from 'actions/SongActions';

@connect(
  state => ({results: state.youtube.searchResults}),
  // dispatch => bindActionCreators(...songActions, dispatch)
  dispatch => bindActionCreators({loadSongYouTube}, dispatch)
)
class YouTubeResults extends Component {
  static propTypes = {
    results: PropTypes.array,
    loadSongYouTube: PropTypes.func
  };
  handleResultClick(item) {
    const videoId = item.id.videoId;
    console.log('video ID!', videoId);
    this.props.loadSongYouTube(videoId, item.snippet.title);
  }
  render() {
    const styles = require('./YouTubeResults.scss');
    const listItems = this.props.results.map(item => {
      return (<li key={item.id.videoId} className={styles.result} onClick={this.handleResultClick.bind(this, item)}>
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
