
/**
 * Stuff that handle the Web Audio API interesting stuff
 */

const audioContext = typeof window !== 'undefined' &&
        new (window.AudioContext || window.webkitAudioContext)();

let bufferSource;

let audioBuffer;  // Current audio buffer data

export async function loadFile(file) {
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (event) => reject(event);
    reader.readAsArrayBuffer(file);
  });
  return new Promise((resolve) => {
    audioContext.decodeAudioData(data, (buffer) => {
      audioBuffer = buffer;
      if (bufferSource) {
        bufferSource.disconnect();
      }
      bufferSource = audioContext.createBufferSource();
      bufferSource.buffer = audioBuffer;
      bufferSource.connect(audioContext.destination);
      resolve(bufferSource);
    });
  });
}

export function play() {
  console.log('audio play');
  bufferSource.start();
}

export function pause() {
  console.log('audio pause');
  bufferSource.stop();
}
