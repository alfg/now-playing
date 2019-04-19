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

    <!-- Settings -->
    <div v-if="isPlaying">
      <Settings :id="id" />
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
import '@/assets/normalize.css';
import '@/assets/skeleton.css';
import Auth from '@/components/Auth.vue';
import TrackInfo from '@/components/TrackInfo.vue';
import Settings from '@/components/Settings.vue';

export default {
  name: 'home',
  components: {
    Auth,
    Settings,
    TrackInfo,
  },
  data() {
    return {
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
  margin-top: 40px;
}

.logo {
  margin: 10px 0;
}

.logo h1 {
  color: #222;
  font-family: 'Pacifico', 'cursive';
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
</style>
