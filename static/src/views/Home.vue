<template>
  <div class="home">

    <!-- Header -->
    <div class="logo">
      <img alt="Logo" src="../assets/spotify_green.png" width="100">
      <h1>Now Playing</h1>
      <p>Display your current playing track for your stream!</p>
    </div>

    <!-- Auth Buttons -->
    <Auth />

    <!-- Footer -->
    <div class="footer">
      <ul>
        <li>View the source on <a href="https://github.com/alfg/now-playing">Github</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import querystring from 'querystring';
import Auth from '@/components/Auth.vue';

export default {
  name: 'home',
  components: {
    Auth,
  },
  data() {
    return {
      code: null,
    }
  },
  mounted() {
    this.code = this.$route.query.code;

    this.getAuthToken();
  },
  methods: {
    getAuthToken() {
      console.log('getAuthToken');

      const url = `/api/get-token?code=${this.code}`;
      fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
          console.log(json);
      });
    },
  },
}
</script>

<style scoped>

.logo {
  margin: 10px 0;
}

.logo h1 {
  color: #222;
  font-size: 48px;
  font-family: 'Pacifico', 'cursive';
  margin: 0;
}

.footer {
  bottom: 5%;
  position: fixed;
  margin-top: 40px;
  text-align: center;
  width: 100%;
}
ul {
  margin: 20px 0;
  padding: 0;
  text-align: center;
}
ul li {
  display: inline-block;
  padding: 0 6px;
}
a {
  color: #643fa6;
  text-decoration: none;
  outline: 0;
  line-height: inherit;
}
a:hover {
  text-decoration: underline;
}
</style>
