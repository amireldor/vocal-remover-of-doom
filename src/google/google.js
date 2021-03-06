import config from 'config';

export const googleReady = new Promise((resolve) => {
  window.googleOnLoadCallback = () => {
    console.log('Google client loaded!');
    gapi.client.setApiKey(config.google.browserKey);
    gapi.client.load('youtube', 'v3');
    resolve();
  };
});

export function loadGoogleClient() {
  console.log('Loading Google client...');
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/client.js?onload=googleOnLoadCallback';
  document.body.appendChild(script);
}

export const youTubeIframeReady = new Promise((resolve) => {
  window.onYouTubeIframeAPIReady = () => {
    console.log('cool iframe');

    // Create the element that will hold the iframe
    let videoIframe = document.createElement('div');  // Don't have to be <iframe> right now
    videoIframe.id = 'youtube-iframe';
    document.body.appendChild(videoIframe);

    resolve();
  }
});

export function loadYouTubeIframeAPI() {
  const script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api';
  document.body.appendChild(script);
}


// // This is a promise that is being recreated everytime a new video is loaded and fulfilled when it's loaded
// export let videoLoaded = new Promise((resolv, reject) => { reject(); });  // A rejected promise for staters

// export function isVideoLoaded() {
//   return videoLoaded;
// }

export function getYouTubeVideoUrl(videoId) {
  return 'https://www.youtube.com/watch?v=' + videoId;
}

export function setVideoSrc(url, autoplay = true) {
  // console.log('will set src to ', url);
  // video.src = url;
  // console.log('after?');
  // video.load();
  // console.log('after 2?');
  // if (videoLoaded) {
  //   // This seems stupid
  //   videoLoaded = null;
  // }
  // videoLoaded = new Promise((resolve, reject) => {
  //   video.onerror = (err) => {
  //     reject(new Error('Video tag loading error: ' + err.message));
  //   };
  //
  //   video.onabort = () => {
  //     reject(new Error(`Loading video tag aborted (${url})`));
  //   };
  //
  //   video.oncanplay = () => {
  //     if (autoplay) {
  //       video.play();
  //     }
  //
  //     resolve(url);
  //   };
  // });
  // return videoLoaded;
}

export function playVideo() {
  // video.play();
}

export function stopVideo() {
  // video.stop();
}
