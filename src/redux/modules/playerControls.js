const PLAYER_PLAY = 'vocal-doom/player-controls/PLAYER_PLAY';
const PLAYER_PAUSE = 'vocal-doom/player-controls/PLAYER_PAUSE';

import Audio from 'audio';

export const STOPPED = 'stopped';
export const PLAYING = 'playing';
export const PAUSED = 'paused';

const initialState = {
  status: STOPPED
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_PLAY:
      Audio.play();
      return {
        ...state,
        status: PLAYING
      };
    case PLAYER_PAUSE:
      Audio.pause();
      return {
        ...state,
        status: PAUSED
      };
    default:
      return state;
  }
}

export function play() {
  return {
    type: PLAYER_PLAY
  };
}

export function pause() {
  return {
    type: PLAYER_PAUSE
  };
}
