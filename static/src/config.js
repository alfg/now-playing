export default {
  SPOTIFY_CLIENT_ID: process.env.VUE_APP_SPOTIFY_CLIENT_ID || '',
  SPOTIFY_REDIRECT_URI: process.env.VUE_APP_SPOTIFY_REDIRECT_URI || 'http://localhost:8080/api/callback',
  SPOTIFY_SCOPE: process.env.VUE_APP_SPOTIFY_SCOPE || 'user-read-currently-playing',
};
