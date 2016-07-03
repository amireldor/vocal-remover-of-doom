const LOAD_SONG = 'vocal-doom/song/LOAD_SONG';
const SONG_LOADED = 'vocal-doom/song/SONG_LOADED';
const FAILED_TO_LOAD_FILE = 'vocal-doom/song/FAILED_TO_LOAD_FILE';

export const SONG_TYPE_FILE = 'song-type-file';
export const SONG_TYPE_STREAM = 'song-type-stream';

import Audio from 'audio';

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
        songName: action.file.name,
        songType: action.songType
      };

    case SONG_LOADED:
      console.log('SONG LOADED');
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
      file
    };
  }
  return (dispatch) => {
    dispatch({ type: LOAD_SONG,
      songType: SONG_TYPE_FILE,
      file
    });

    Audio.loadFile(file).then(data => {
      console.log('ready', data);
      dispatch({ type: SONG_LOADED });
    }).then(() => {
      dispatch(playerControls.play());  // TODO: remove, this is temp for checking, edit: is it?
    });
  };
}

export function loadSongStream(url) {
  console.log('inside osng.js', url);
  return {
    type: LOAD_SONG,
    songType: SONG_TYPE_STREAM,
    url
  };
}
