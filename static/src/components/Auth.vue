<template>
  <div class="auth">
    <a class="button" :href="authorizeUrl">Login with Spotify</a>
  </div>
</template>

<script>
import querystring from 'querystring';

export default {
  name: 'Auth',
  props: {
  },
  computed: {
    authorizeUrl() {
      const endpoint = 'https://accounts.spotify.com/authorize';
      const params = {
        'client_id': process.env.VUE_APP_SPOTIFY_CLIENT_ID,
        'response_type': 'code',
        'redirect_uri': 'http://localhost:8080/callback',
        'scope': 'user-read-currently-playing user-read-private user-read-email',
        'state': '12345',
      }
      const url = `${endpoint}?${querystring.stringify(params)}`;
      return url;
    }
  },
  mounted() {
    // const url = `/api`;

    // fetch(url)
    //   .then((response) => {
    //       return response.json();
    //   })
    //   .then((json) => {
    //     console.log(json);
    //   });
  }
};
</script>

<style scoped>
.auth {
  margin: 20px 0;
}

.button {
  display: inline-block;
  font-size: 14px;
  font-family: Circular,Helvetica,Arial,sans-serif;
  line-height: 1;
  border-radius: 500px;
  padding: 18px 48px 16px;
  transition-property: background-color,border-color,color,box-shadow,filter;
  transition-duration: .3s;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  font-weight: 700;

  color: #fff;
  background-color: #1db954;
  border-color: #1aa34a;
  text-decoration: none;
}
</style>
