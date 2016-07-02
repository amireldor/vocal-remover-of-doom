const LOAD_SONG_FILE = 'vocal-doom/song-file/LOAD_SONG_FILE';
const SONG_FILE_LOADED = 'vocal-doom/song-file/SONG_FILE_LOADED';

import Audio from 'audio';

const initialState = {
  fileSelected: false,
  fileReady: false,
  fileName: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SONG_FILE:
      return {
        ...state,
        fileSelected: true,
        fileReady: false,
        fileName: action.file.name
      };

    case SONG_FILE_LOADED:
      console.log('SONG LOADED');
      return {
        ...state,
        fileReady: true
      };

    default:
      return state;
  }
}

export function loadSongFile(file) {
  return (dispatch) => {
    dispatch({ type: LOAD_SONG_FILE, file });
    Audio.loadFile(file).then(data => {
      console.log('ready', data);
      dispatch({ type: SONG_FILE_LOADED });
    });
  };
}
