import React, { Component } from 'react';

import {FileInput, YouTubeInput} from 'components';

class SongSelector extends Component {
  render() {
    const styles = require('./SongSelector.scss');
    return (<div className={styles.songSelector}>
            <FileInput />
            <YouTubeInput />
            </div>);
  }
}

export default SongSelector;
