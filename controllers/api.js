const querystring = require('querystring');
const axios = require('axios');
const router = require('express').Router();
const config = require('../config');

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_SECRET,
  SPOTIFY_REDIRECT_URI,
} = config;

router.get('/', (req, res) => {
  return res.json({ test: 'test' });
});

router.get('/callback', (req, res) => {
  const code = req.query.code || null; 
  const state = req.query.state || null;

  if (state === null) {
    return res.redirect('/');
  } else {
    return getToken(req, res);
  }
});

function getToken(req, res) {
  const code = req.query.code || null;
  const url = 'https://accounts.spotify.com/api/token';
  const data = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: SPOTIFY_REDIRECT_URI,
  }
  const auth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET}`).toString('base64');
  const options = {
    headers: {
      'Authorization': `Basic ${auth}`,
    }
  }

  axios.post(url, querystring.stringify(data), options)
    .then((response) => {
      const { access_token, refresh_token, expires_in } = response.data;
      return res.redirect('/?' + querystring.stringify({
        access_token,
        refresh_token,
        expires_in,
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};

router.get('/now-playing', (req, res) => {
  const token = req.headers['authorization'] || null;
  const url = 'https://api.spotify.com/v1/me/player/currently-playing';
  const options = {
    headers: {
      'Authorization': `${token}`,
    }
  }

  axios.get(url, options)
    .then((response) => {
      const resp = {
        is_playing: response.data.is_playing,
        song_name: response.data.item.name,
        artist_name: response.data.item.artists[0].name,
        album_name: response.data.item.album.name,
        album_image: response.data.item.album.images
          .find(o => o.height === 300).url,
      }


      // Broadcast to WS.

      return res.json(resp);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
