
/**
 * Stuff that handle the Web Audio API interesting stuff
 */

import {AudioContextConstructor} from 'audio';

const audioContext = AudioContextConstructor && new AudioContextConstructor();

export function loadFile(file) {
  console.log('websaudio', file, audioContext);
}

