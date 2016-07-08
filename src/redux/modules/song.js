import {LOAD_SONG, SONG_LOADED_FILE, SONG_LOADED_YOUTUBE} from 'constants/ActionTypes';

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

