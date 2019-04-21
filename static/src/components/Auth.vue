<template>
  <div class="auth">
    <a class="button" :href="authorizeUrl">Login with Spotify</a>
  </div>
</template>

<script>
import querystring from 'querystring';
import config from '@/config';

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_SCOPE,
} = config;

export default {
  name: 'Auth',
  props: {
  },
  computed: {
    authorizeUrl() {
      const endpoint = 'https://accounts.spotify.com/authorize';
      const params = {
        client_id: SPOTIFY_CLIENT_ID,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        scope: SPOTIFY_SCOPE,
        response_type: 'code',
        state: '12345',
      };

      const url = `${endpoint}?${querystring.stringify(params)}`;
      return url;
    },
  },
};
</script>

<style scoped>
.auth {
  margin: 20px 0;
}

.button {
  color: #fff;
  background-color: #1db954;
  border-color: #1aa34a;
  border-radius: 500px;
  font-size: 14px;
}
</style>
