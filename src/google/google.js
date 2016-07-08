import config from 'config';

export function loadGoogleClient() {
  console.log('Loading Google client...');
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/client.js?onload=googleOnLoadCallback';
  document.body.appendChild(script);
}

export const googleReady = new Promise((resolve) => {
  window.googleOnLoadCallback = () => {
    console.log('Google client loaded!');
    gapi.client.setApiKey(config.google.browserKey);
    gapi.client.load('youtube', 'v3');
    resolve();
  };
});

// This is a promise that is being recreated everytime a new video is loaded and fulfilled when it's loaded
export let videoLoaded = new Promise((resolv, reject) => { reject(); });  // A rejected promise for staters

export function isVideoLoaded() {
  return videoLoaded;
}

export function getYouTubeVideoUrl(videoId) {
  return 'https://www.youtube.com/watch?v=' + videoId;
}

// Create <video> that will play the youtube stuff, even when hidden
let video = null;
if (typeof document !== 'undefined') {
  video = document.createElement('video');
  video.id = 'youtube-player';
  document.body.appendChild(video);
}

export function setVideoSrc(url, autoplay = true) {
  video.src = url;
  video.load();
  if (videoLoaded) {
    // In case there's a previous promise, I think this will safely help it to be garbage collected.
    videoLoaded.reject(new Error('Rejecting previous videoLoaded promise to free any .then\'s that might be waiting.'));
  }
  videoLoaded = new Promise((resolve, reject) => {
    video.error = (err) => {
      reject(new Error('Video tag loading error: ' + err));
    };

    video.abort = () => {
      reject(new Error(`Loading video tag aborted (${url})`));
    };

    video.canplay = () => {
      if (autoplay) {
        video.play();
      }

      resolve(url);
    };
  });
}

export function playVideo() {
  video.play();
}

export function stopVideo() {
  video.stop();
}
