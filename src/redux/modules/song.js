const LOAD_SONG = 'vocal-doom/song/LOAD_SONG';
const SONG_LOADED_FILE = 'vocal-doom/song/SONG_LOADED_FILE';
// const SONG_LOADED_STREAM = 'vocal-doom/song/SONG_LOADED_STREAM';  // TODO: Will I ever use it?
const SONG_LOADED_YOUTUBE = 'vocal-doom/song/SONG_LOADED_YOUTUBE';
const FAILED_TO_LOAD_FILE = 'vocal-doom/song/FAILED_TO_LOAD_FILE';

export const SONG_TYPE_FILE = 'song-type-file';
// export const SONG_TYPE_STREAM = 'song-type-stream';
export const SONG_TYPE_YOUTUBE = 'song-type-youtube';

import Audio from 'audio';
import Google from 'google';
// console.log('videoLoaded here', Google.videoLoaded);
console.log('google', Google);

import * as playerControls from 'redux/modules/playerControls';  // TODO: remove, temp

const initialState = {
  songSelected: false,
  songReady: false,
  songName: '',
  streamUrl: '',  // Used with streams
  songType: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SONG:
      return {
        ...state,
        songSelected: true,
        songReady: false,
        songName: action.title,
        songType: action.songType
      };

    case SONG_LOADED_FILE:
      return {
        ...state,
        songReady: true
      };

    case SONG_LOADED_YOUTUBE:
      return {
        ...state,
        songReady: true
      };

    default:
      return state;
  }
}

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

    // Google.videoLoaded.then(() => {
    //   console.log('LAOADEDAD!!!!!');
    //   dispatch({ type: SONG_LOADED_YOUTUBE });
    // }, () => {
    //   // TODO: Dispatch an error action
    // });
  };
}
