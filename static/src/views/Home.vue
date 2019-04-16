<template>
  <div class="home">

    <!-- Header -->
    <div class="logo">
      <img alt="Logo" src="../assets/spotify_green.png" width="100">
      <h1>Now Playing</h1>
      <h4>Display your current playing track for your stream!</h4>
    </div>

    <!-- Auth Buttons -->
    <div v-if="!id">
      <Auth />
    </div>

    <!-- Song Info -->
    <div v-if="isPlaying">
      <TrackInfo :data="data" />
    </div>

    <!-- Copy paste -->
    <div v-if="isPlaying">
      <h4>Paste this URL into OBS as a Browser Source</h4>
      <input type="text" :value="`${host}/spotify/${id}`" readonly="readonly" />
    </div>

    <!-- Footer -->
    <div class="footer">
      <ul>
        <li>View the source on <a href="https://github.com/alfg/now-playing">Github</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Auth from '@/components/Auth.vue';
import TrackInfo from '@/components/TrackInfo.vue';

export default {
  name: 'home',
  components: {
    Auth,
    TrackInfo,
  },
  data() {
    return {
      host: window.location.origin,
      id: null,
      isPlaying: false,
      data: {},
    };
  },
  mounted() {
    this.id = this.$route.query.id;

    this.setUpdateTimer();
  },
  methods: {
    setUpdateTimer() {
      if (this.id) this.getNowPlaying();

      setInterval(() => {
        if (this.id) {
          this.getNowPlaying();
        }
      }, 5000);
    },

    getNowPlaying() {
      const url = `/api/now-playing/${this.id}`;

      fetch(url)
        .then(response => (
          response.json()
        ))
        .then((json) => {
          this.isPlaying = json.is_playing;
          this.data = json;
        });
    },
  },
};
</script>

<style scoped>
.home {
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
}

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
  max-width: 800px;
  text-align: center;
  width: 80%;
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

input[type="text"] {
  width: 60%;
  height: 38px;
  padding: 6px 10px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
