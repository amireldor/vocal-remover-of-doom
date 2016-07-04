export function loadGoogleClient() {
  // <script src="https://apis.google.com/js/client.js?onload=googleOnLoadCallback"></script>

  console.log('Loading Google client...');
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/client.js?onload=googleOnLoadCallback';
  document.body.appendChild(script);
}

window.googleOnLoadCallback = function () {
  console.log('google load!!!!');
};
