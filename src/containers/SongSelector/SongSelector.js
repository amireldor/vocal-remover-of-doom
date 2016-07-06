import React, { Component } from 'react';

import {FileInput, YouTubeInput, YouTubeResults} from 'components';

class SongSelector extends Component {
  render() {
    const styles = require('./SongSelector.scss');
    return (<div className={styles.songSelector}>
              <div className={styles.inputs}>
                <FileInput />
                <YouTubeInput />
            </div>
              <div className={styles.youTubeResults}>
                <YouTubeResults />
              </div>
            </div>);
  }
}

export default SongSelector;
