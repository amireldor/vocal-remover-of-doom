
/**
 * Stuff that handle the Web Audio API interesting stuff
 */

const context = typeof window !== 'undefined' &&
        new (window.AudioContext || window.webkitAudioContext)();

/**
 * Utility for making pausing file buffers easier
 */
class PauseManager {
  constructor() {
    this.lastPauseTime = 0;
    this.lastStartTime = 0;
    this._offset = 0;
  }

  pause() {
    this.lastPauseTime = context.currentTime;
    this._offset += this.lastPauseTime - this.lastStartTime;
  }

  start() {
    this.lastStartTime = context.currentTime;
  }

  reset() {
    this._offset = 0;
  }

  get offset() {
    return this._offset;
  }
}

// /**
//  * Some abstraction. Manages the main audio buffer.
//  */
// class AudioBufferManager {
//   constructor() {
//     if (!audioContext) return;
//     this.scriptProcessorNode = audioContext.createScriptProcessor();
//     // Use deprecated method as new method is not widely implemented
//     this.scriptProcessorNode.onaudioprocess = this.onAudioProcess;
//     this.scriptProcessorNode.connect(audioContext.destination);
//     this.sourceNode = null;

//     // For handling pausing and stuff as createBufferSource can be started only once
//     this.pauseManager = new PauseManager();
//     this.sourceBuffer = null;
//   }

//   /**
//    * The processing function that phases-out the mono signal (usually the vocals)
//    */
//   onAudioProcess(audioProcessingEvent) {
//     const inputBuffer = audioProcessingEvent.inputBuffer;
//     const outputBuffer = audioProcessingEvent.outputBuffer;

//     const inputLeft = inputBuffer.getChannelData(0);
//     const inputRight = inputBuffer.getChannelData(1);
//     const outputLeft = outputBuffer.getChannelData(0);
//     const outputRight = outputBuffer.getChannelData(1);

//     for (let sample = 0; sample < inputLeft.length; sample++) {
//       outputLeft[sample] = inputLeft[sample] - inputRight[sample];
//       outputRight[sample] = inputRight[sample] - inputLeft[sample];
//     }
//   }

//   setBufferSource(audioBuffer) {
//     if (!this.stereoCheck(audioBuffer)) {
//       // TODO
//     }
//     this.clear();
//     this.sourceNode = audioContext.createBufferSource();
//     this.sourceNode.buffer = audioBuffer;
//     this.sourceNode.connect(this.scriptProcessorNode);
//     this.sourceBuffer = buffer;
//   }

//   setStreamSource(audioStreamURL) {
//     this.clear();
//     this.streamNode = audioContext.createMediaStreamSource(audioStreamURL);
//     if (!this.stereoCheck(this.streamNode.buffer)) {
//       this.clear();
//       // TODO
//     }
//     // this.bufferStreamNode.buffer = audioBuffer;
//     this.sourcemNode.connect(this.scriptProcessorNode);
//   }

//   stereoCheck(/* audioBuffer */) {
//     // TODO: implement
//     return true;
//   }

//   play() {
//     if (!this.sourceNode) {
//       console.error('AudioBufferManager: no buffer to play');
//       return;
//     }
//     const offset = this.pauseManager.offset;
//     if (offset > 0) {
//       this.setBufferSource(this.sourceBuffer);
//     }
//     this.sourceNode.start(0, this.pauseManager.offset);
//     this.pauseManager.start();
//   }

//   pause() {
//     if (!this.sourceNode) {
//       console.error('AudioBufferManager: no buffer to pause');
//       return;
//     }
//     this.sourceNode.stop();
//     this.pauseManager.pause();
//   }

//   clear() {
//     if (this.sourceNode) {
//       this.sourceNode.disconnect();
//     }
//     this.sourceNode = null;
//   }
// }

// const audioBufferManager = new AudioBufferManager();

// export async function loadFile(file) {
//   const data = await new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (event) => resolve(event.target.result);
//     reader.onerror = (event) => reject(event);
//     reader.readAsArrayBuffer(file);
//   });
//   return new Promise((resolve) => {
//     audioContext.decodeAudioData(data, (buffer) => {
//       audioBufferManager.setBufferSource(buffer);
//       resolve(buffer);
//     });
//   });
// }

// export async function loadStream(stream) {
//   const sourceURL = (window.URL || window.webkitURL).createObjectURL(stream) || stream;

//   // video.src = sourceURL;

//   audioBufferManager.setBufferStream(sourceURL);

//   // Cleanup
//   if (sourceURL.revokeObjectURL) {
//     sourceURL.revokeObjectURL();
//   }
// }

// export function play() {
//   console.log('audio play');
//   audioBufferManager.play();
// }

// export function pause() {
//   console.log('audio pause');
//   audioBufferManager.pause();
// }

/**
 * The processing function that phases-out the mono signal (usually the vocals)
 */
function phaseCancellationHandler(audioProcessingEvent) {
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

const phaseCancellationNode = context && context.createScriptProcessor();
if (phaseCancellationNode) {
  phaseCancellationNode.onaudioprocess = phaseCancellationHandler;
  phaseCancellationNode.connect(context.destination);
}

/**
 * Base class for stuff that is being _played_
 */
class NowPlaying {
  constructor(source) {}  // eslint-disable-line no-unused-vars
  play() {}
  pause() {}
  seek(time) {}  // eslint-disable-line no-unused-vars
  clean() {}
}

class NowPlayingBuffer extends NowPlaying {
  constructor(sourceBuffer) {
    super();
    this.pauser = new PauseManager();
    this.sourceBuffer = sourceBuffer;
    this.setupNode();
  }

  setupNode() {
    this.audioNode = null;
    this.audioNode = context.createBufferSource();
    this.audioNode.buffer = this.sourceBuffer;
    this.audioNode.connect(phaseCancellationNode);
  }

  play() {
    if (this.pauser.offset > 0) {
      this.setupNode();
      console.log('offset', this.pauser.offset);
      console.log('node', this.audioNode);
    }
    this.audioNode.start(0, this.pauser.offset);
    this.pauser.start();
  }

  pause() {
    this.audioNode.stop();
    this.pauser.pause();
  }

  clean() {
    this.audioNode.disconnect();
    this.audioNode = null;
    this.sourceBuffer = null;
  }
  // seek(time) {
  // }
}

let nowPlaying = null;

/**
 * Loads a file as the current playing thing
 */
export async function loadFile(file) {
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (event) => reject(event);

    reader.readAsArrayBuffer(file);
  });
  return new Promise((resolve) => {
    context.decodeAudioData(data, (buffer) => {
      if (nowPlaying) {
        nowPlaying.clean();
      }
      nowPlaying = new NowPlayingBuffer(buffer);
      resolve(buffer);
    });
  });
}


export function play() {
  if (!nowPlaying) {
    console.error('Nothing to play!');
    return;
  }
  nowPlaying.play();
}

export function pause() {
  if (!nowPlaying) {
    console.error('Nothing to pause!');
    return;
  }
  nowPlaying.pause();
}
