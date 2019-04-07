// const utils = require('../utils');
// const cache = require('../cache');
const querystring = require('querystring');
const axios = require('axios');
const router = require('express').Router();

router.get('/', (req, res) => {
    return res.json({ test: 'test' });
});

router.get('/get-token', (req, res) => {
    const code = req.query.code || null;
    const url = 'https://accounts.spotify.com/api/token';
    const data = {
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': 'http://localhost:8080/callback',
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
        return res.json(response.data);
      })
      .catch((err) => {
        console.log('error!');
        console.log(err);
        // return res.json(err);
      });
});

module.exports = router;
