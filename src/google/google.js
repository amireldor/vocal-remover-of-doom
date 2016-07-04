import config from 'config';

export function loadGoogleClient() {
  // <script src="https://apis.google.com/js/client.js?onload=googleOnLoadCallback"></script>

  console.log('Loading Google client...');
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/client.js?onload=googleOnLoadCallback';
  document.body.appendChild(script);
}

export const googleReady = new Promise((resolve) => {
  window.googleOnLoadCallback = () => {
    console.log('Google client loaded!');
    gapi.client.setApiKey(config.google.browserKey);
    resolve();
  };
});

