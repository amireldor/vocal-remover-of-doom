import * as _audioFunctions from './audio';

let audioFunctions = _audioFunctions;  // These are the *real* Web Audio API functions

if (typeof window === 'undefined') {
  console.log('no no no ');
  audioFunctions = {};  // No audio stuff if no API support
}
// Now export either {} or the real functions
export default {
  ...audioFunctions
};

