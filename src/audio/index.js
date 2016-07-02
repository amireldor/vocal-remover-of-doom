export const AudioContextConstructor = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);

import * as _audioFunctions from './audio';

let audioFunctions = _audioFunctions;  // These are the *real* Web Audio API functions

if (!AudioContextConstructor) {
  audioFunctions = {};  // No audio stuff if no API support
}

// Now export either {} or the real functions
export default {
  ...audioFunctions
};

