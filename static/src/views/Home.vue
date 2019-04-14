<template>
  <div class="home">

    <!-- Header -->
    <div class="logo">
      <img alt="Logo" src="../assets/spotify_green.png" width="100">
      <h1>Now Playing</h1>
      <p>Display your current playing track for your stream!</p>
    </div>

    <!-- Auth Buttons -->
    <div v-if="!id">
      <Auth />
    </div>

    <!-- Song Info -->
    <div v-if="isPlaying">
      <TrackInfo :data="data" />
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
