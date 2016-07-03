/**
 * TODO: should probably be a single component which is  `connected()`
 * instead of a pair of container and components like redux wants. This is
 * how the creator of the redux-example did it.
 */
import React, { Component } from 'react';

import {FileInput, StreamInput} from 'components';

class SongSelector extends Component {
  // render() {
  //   return (
  //     <div>
  //       <FileInput />
  //       <StreamInput />
  //     </div>
  //   );
  // }
  render() {
    return (<div>
            <FileInput />
            <StreamInput />
            </div>);
  }
}

export default SongSelector;
