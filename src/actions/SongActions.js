import {LOAD_SONG, SONG_LOADED_FILE, SONG_LOADED_YOUTUBE,
        FAILED_TO_LOAD_FILE} from 'constants/ActionTypes';
import {SONG_TYPE_FILE, SONG_TYPE_YOUTUBE} from 'constants/stuff';

import Audio from '../audio';
import Google from '../google';

// TODO: remove or move controls to actions
import * as playerControls from 'redux/modules/playerControls';  // TODO: remove, temp

export function loadSongFile(file) {
  if (!file) {
    return {
      type: FAILED_TO_LOAD_FILE,
      title: file.name
    };
  }
  return (dispatch) => {
    dispatch({ type: LOAD_SONG,
      songType: SONG_TYPE_FILE,
      title: file.name
    });

    Audio.loadFile(file).then(() => {
      dispatch({ type: SONG_LOADED_FILE });
    }).then(() => {
      dispatch(playerControls.play());  // TODO: remove, this is temp for checking, edit: is it?
    });
  };
}

// export function loadSongStream(url) {
//   console.log('inside osng.js', url);
//   return {
//     type: LOAD_SONG,
//     songType: SONG_TYPE_STREAM,
//     url
//   };
// }

export function loadSongYouTube(videoId, title) {
  return dispatch => {
    dispatch({
      type: LOAD_SONG,
      songType: SONG_TYPE_YOUTUBE,
      title
    });

    Google.setVideoSrc(Google.getYouTubeVideoUrl(videoId))
    .then(() => {
      console.log('LAOADEDAD!!!!!');
      dispatch({ type: SONG_LOADED_YOUTUBE });
    }, (err) => {
      console.error('Error loading YouTube video:', err);
      // TODO: Dispatch an error action
    });
  };
}
