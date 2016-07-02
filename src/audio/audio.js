
/**
 * Stuff that handle the Web Audio API interesting stuff
 */

const audioContext = typeof window !== 'undefined' &&
        new (window.AudioContext || window.webkitAudioContext)();

/**
 * Some abstraction. Manages the main audio buffer.
 */
class AudioBufferManager {
  constructor() {
    if (!audioContext) return;
    this.scriptProcessorNode = audioContext.createScriptProcessor();
    // Use deprecated method as new method is not widely implemented
    this.scriptProcessorNode.onaudioprocess = this.onAudioProcess;
    this.scriptProcessorNode.connect(audioContext.destination);
    this.bufferSourceNode = null;
  }

  onAudioProcess(audioProcessingEvent) {
    const inputBuffer = audioProcessingEvent.inputBuffer;
    const outputBuffer = audioProcessingEvent.outputBuffer;

    const inputLeft = inputBuffer.getChannelData(0);
    const inputRight = inputBuffer.getChannelData(1);
    const outputLeft = outputBuffer.getChannelData(0);
    const outputRight = outputBuffer.getChannelData(1);

    for (let sample = 0; sample < inputLeft.length; sample++) {
      outputLeft[sample] = inputLeft[sample] - inputRight[sample];
      outputRight[sample] = inputRight[sample] - inputLeft[sample];
    }
  }

  setBuffer(audioBuffer) {
    // TODO: check for stereo
    this.clear();
    this.bufferSourceNode = audioContext.createBufferSource();
    this.bufferSourceNode.buffer = audioBuffer;
    this.bufferSourceNode.connect(this.scriptProcessorNode);
  }

  play() {
    if (!this.bufferSourceNode) {
      console.error('AudioBufferManager: no buffer to play');
      return;
    }
    this.bufferSourceNode.start();
  }

  pause() {
    if (!this.bufferSourceNode) {
      console.error('AudioBufferManager: no buffer to pause');
      return;
    }
    this.bufferSourceNode.stop();
  }

  clear() {
    if (this.bufferSourceNode) {
      this.bufferSourceNode.disconnect();
    }
    this.bufferSourceNode = null;
  }
}

const audioBufferManager = new AudioBufferManager();

export async function loadFile(file) {
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (event) => reject(event);
    reader.readAsArrayBuffer(file);
  });
  return new Promise((resolve) => {
    audioContext.decodeAudioData(data, (buffer) => {
      audioBufferManager.setBuffer(buffer);
      resolve(buffer);
    });
  });
}

export function play() {
  console.log('audio play');
  audioBufferManager.play();
}

export function pause() {
  console.log('audio pause');
  audioBufferManager.stop();
}
