import React, { Component } from 'react';

import {FileInput, StreamInput} from 'components';

class SongSelector extends Component {
  render() {
    const styles = require('./SongSelector.scss');
    return (<div className={styles.songSelector}>
            <FileInput />
            <StreamInput />
            </div>);
  }
}

export default SongSelector;
