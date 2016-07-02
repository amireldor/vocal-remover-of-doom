const LOAD_SONG_FILE = 'vocal-doom/song-file/LOAD_SONG_FILE';

import Audio from 'audio';

const initialState = {
  fileSelected: false,
  fileReady: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SONG_FILE:
      Audio.loadFile(file).then(data => {
        console.log('ready', data);
      });
      return {
        ...state,
        fileSelected: true
      };
    default:
      return state;
  }
}

export function loadSongFile(file) {
  return {
    type: LOAD_SONG_FILE,
    file
  };
}
