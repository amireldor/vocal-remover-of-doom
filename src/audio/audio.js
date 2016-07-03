
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
    this.sourceNode = null;

    // For handling pausing and stuff as createBufferSource can be started only once
    this.pauseManagerState = {
      shouldBeUsed: false,  // If this object should be used at all (no need in media stream for example)
      buffer: null
    };
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

  setBufferSource(audioBuffer) {
    if (!this.stereoCheck(audioBuffer)) {
      // TODO
    }
    this.clear();
    this.sourceNode = audioContext.createBufferSource();
    this.sourceNode.buffer = audioBuffer;
    this.sourceNode.connect(this.scriptProcessorNode);

    const shouldBeUsed = true;
    this.handlePauseManager(this.sourceNode.buffer, shouldBeUsed);
  }

  setStreamSource(audioStreamURL) {
    this.clear();
    this.streamNode = audioContext.createMediaStreamSource(audioStreamURL);
    if (!this.stereoCheck(this.streamNode.buffer)) {
      this.clear();
      // TODO
    }
    // this.bufferStreamNode.buffer = audioBuffer;
    this.sourcemNode.connect(this.scriptProcessorNode);

    const shouldNotBeUsed = false;
    this.handlePauseManager(this.streamNode.buffer, shouldNotBeUsed);
  }

  handlePauseManager(buffer, shouldBeUsed) {
    this.pauseManagerState = {
      buffer,
      shouldBeUsed,
      offset: audioContext.currentTime
    };
  }

  stereoCheck(/* audioBuffer */) {
    // TODO: implement
    return true;
  }

  play() {
    if (!this.sourceNode) {
      console.error('AudioBufferManager: no buffer to play');
      return;
    }
    let offset = 0;
    if (this.pauseManagerState.shouldBeUsed) {
      // Recreate buffer
      this.setBufferSource(this.pauseManagerState.buffer);
      offset = this.pauseManagerState.offset;
    }
    this.sourceNode.start(0, offset);
  }

  pause() {
    if (!this.sourceNode) {
      console.error('AudioBufferManager: no buffer to pause');
      return;
    }
    this.sourceNode.stop();
  }

  clear() {
    if (this.sourceNode) {
      this.sourceNode.disconnect();
    }
    this.sourceNode = null;
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
      audioBufferManager.setBufferSource(buffer);
      resolve(buffer);
    });
  });
}

export async function loadStream(stream) {
  const sourceURL = (window.URL || window.webkitURL).createObjectURL(stream) || stream;

  // video.src = sourceURL;

  audioBufferManager.setBufferStream(sourceURL);

  // Cleanup
  if (sourceURL.revokeObjectURL) {
    sourceURL.revokeObjectURL();
  }
}

export function play() {
  console.log('audio play');
  audioBufferManager.play();
}

export function pause() {
  console.log('audio pause');
  audioBufferManager.pause();
}
