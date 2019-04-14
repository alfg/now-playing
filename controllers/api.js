const querystring = require('querystring');
const axios = require('axios');
const router = require('express').Router();
const config = require('../config');
const EventEmitter = require('events');
const redis = require('redis');
const shortid = require('shortid');

const Stream = new EventEmitter();
const rClient = redis.createClient();

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
      
      // Create redis entry for user.
      const guid = shortid.generate();
      rClient.set(guid, `${access_token}:${refresh_token}:${expires_in}`, redis.print);

      return res.redirect('/?' + querystring.stringify({
        id: guid,
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};

router.get('/now-playing/:id', (req, res) => {
  const id = req.params.id;
  const url = 'https://api.spotify.com/v1/me/player/currently-playing';

  getAuthToken(id, (accessToken) => {
    const options = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
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
        return res.json(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

function getAuthToken(id, callback) {
  rClient.get(id, (err, reply) => {
    const accessToken = reply.split(':')[0];
    return callback(accessToken);
  });
}

module.exports = router;
