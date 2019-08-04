# Now Playing
![Now Playing](/static/public/img/logo.png)

> Display your current playing track for your stream!

https://now-playing.streamcat.tv

## Develop
Now Playing is developed with NodeJS/Express for the backend & Vue.js for the frontend client.

Requires the following for development:
* NodeJS 6+
* Redis

* Clone the project and install dependencies:
```
git clone https://github.com/alfg/now-playing
npm install && cd static && npm install
```

* Create Spotify API client ID and secret from the Developer Dashboard:
https://developer.spotify.com/dashboard/applications

* Set the required environment variables:
```
SPOTIFY_CLIENT_ID=
SPOTIFY_SECRET=
SPOTIFY_REDIRECT_URI=
REDIS_HOST=localhost
REDIS_PORT=637
```

Or create a `.env` file with the credentials above.

Run the NodeJS server and static frontend in separate processes:
```
node app.js
cd static && npm run serve
```

You should now have 2 separate processes running. 

Load `http://localhost:4000/` into your browser.

## Docker
```
docker-compose build
docker-compose up
```

Load in browser:
http://localhost:4000

## License
MIT
