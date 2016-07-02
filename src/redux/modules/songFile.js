const LOAD_SONG_FILE = 'vocal-doom/song-file/LOAD_SONG_FILE';

import Audio from 'audio';

const initialState = {
  fileSelected: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SONG_FILE:
      return {
        ...state,
        fileSelected: true
      };
    default:
      return state;
  }
}

export function loadSongFile(file) {
  console.log('REDUCER SONG FILE loadSongFile', file);
  console.log('AUDIO', Audio);
  Audio.loadFile(file);
  return {
    type: LOAD_SONG_FILE,
    file
  };
}
