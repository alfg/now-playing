const querystring = require('querystring');
const axios = require('axios');
const router = require('express').Router();
const config = require('../config');
const redis = require('redis');
const shortid = require('shortid');
const EventEmitter = require('events');
const Stream = new EventEmitter();

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_SECRET,
  SPOTIFY_REDIRECT_URI,
  REDIS_HOST,
  REDIS_PORT,
} = config;

const rClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

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
      const obj = {
        created: new Date().toISOString(),
        access_token,
        refresh_token,
        expires_in
      };
      rClient.set(guid, JSON.stringify(obj), redis.print);

      return res.redirect('/?' + querystring.stringify({
        id: guid,
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};

router.get('/playing/:id', (req, res) => {
  const id = req.params.id;
  const url = 'https://api.spotify.com/v1/me/player/currently-playing';

  rClient.get(id, (err, reply) => {
    if (!reply) {
      return res.status(404).json({ message: 'Not found.' });
    } else {
      getAuthToken(id, (accessToken) => {
        const options = {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }

        axios.get(url, options)
          .then((response) => {
            const resp = {
              is_playing: response.data.is_playing || false,
              song_name: response.data.item.name || '',
              artist_name: response.data.item.artists[0].name || '',
              album_name: response.data.item.album.name || '',
              album_image: response.data.item.album.images
                .find(o => o.height === 300).url || '',
            }
            res.json(resp);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  });

});

function getAuthToken(id, callback) {
  rClient.get(id, (err, reply) => {
    const { access_token, refresh_token, expires_in, created } = JSON.parse(reply);

    const now = new Date();
    const expired = (new Date(created).getTime() + (1000 * expires_in)) < now;

    // Get refresh token and update DB if expired.
    if (expired) {
      getNewAuthToken(id, refresh_token, (newAuthToken) => {
        return callback(newAuthToken);
      });
    }

    return callback(access_token);
  });
}

function getNewAuthToken(id, refreshToken, callback) {
  const url = 'https://accounts.spotify.com/api/token';
  const data = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }
  const auth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET}`).toString('base64');
  const options = {
    headers: {
      'Authorization': `Basic ${auth}`,
    }
  }

  axios.post(url, querystring.stringify(data), options)
    .then((response) => {
      const { access_token, refresh_token: newRefreshToken, expires_in } = response.data;
      
      // Update redis entry for id.
      const obj = {
        created: new Date().toISOString(),
        access_token,
        refresh_token: newRefreshToken || refreshToken, // If no refresh_token returned, use old one.
        expires_in,
      };
      rClient.set(id, JSON.stringify(obj), redis.print);
      return callback(access_token);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = router;
