
/**
 * Stuff that handle the Web Audio API interesting stuff
 */

const audioContext = typeof window !== 'undefined' &&
        new (window.AudioContext || window.webkitAudioContext)();

let audioBuffer;  // Current audio buffer data

export async function loadFile(file) {
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (event) => reject(event);
    reader.readAsArrayBuffer(file);
  });
  audioContext.decodeAudioData(data, (buffer) => {
    audioBuffer = buffer;
  });
}

