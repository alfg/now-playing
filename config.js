module.exports = {
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || '',
  SPOTIFY_SECRET: process.env.SPOTIFY_SECRET || '',
  SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:8080/api/callback',
}