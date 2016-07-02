const LOAD_SONG_FILE = 'vocal-doom/song-file/LOAD_SONG_FILE';

const initialState = {
  fileSelected: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
