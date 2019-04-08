const querystring = require('querystring');
const axios = require('axios');
const router = require('express').Router();

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
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': 'http://localhost:8080/api/callback',
  }
  const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET}`).toString('base64');
  const options = {
    headers: {
      'Authorization': `Basic ${auth}`,
    }
  }


  axios.post(url, querystring.stringify(data), options)
    .then((response) => {
      console.log(response.data);
      const { access_token, refresh_token, expires_in } = response.data;
      return res.redirect('/?' + querystring.stringify({
        access_token,
        refresh_token,
        expires_in,
      }));
    })
    .catch((err) => {
      console.log('error!');
       res.json(err);
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
        name: response.data.item.name,
      }
      return res.json(resp);
    })
    .catch((err) => {
      console.log('error!', err);
       res.json(err);
    });
});

module.exports = router;
