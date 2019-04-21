<template>
  <div class="track-info" :class="theme">
    <div class="loading" v-if="isLoading">Loading</div>
    <div class="wrapper" v-else>
      <div class="cover">
        <img :src="data.album_image" />
      </div>
      <div class="song-info" v-if="theme === 'f'">
        <div class="name">{{ data.song_name }}</div>
        <div class="artist">{{ data.artist_name }}</div>
        <div class="album">{{ data.album_name }}</div>
      </div>

      <div class="song-info" v-else>
        <div class="name">{{ data.artist_name }} &mdash; {{ data.song_name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'track-info',
  props: ['data', 'theme'],
  computed: {
    isLoading() {
      return Object.keys(this.data).length === 0 && this.data.constructor === Object;
    },
  },
};
</script>

<style scoped>

/* Full Theme */
.f.track-info {
  color: #fff;
  width: 400px;
  height: 100px;
  margin: 0 auto;
  background: #191414;
  border: 1px solid #444;
  padding: 10px;
}

.f .wrapper {
  height: 100%;
}

.f .cover {
 float: left;
 width: 30%;
 height: 100%;
}

.f .cover img {
  height: 100%;
  float: left;
}

.f .song-info {
  float: right;
  width: 70%;
  height: 100%;
}

.f .song-info div {
  text-align: left;
}

.f .song-info .name {
  height: 50%;
  font-weight: bold;
  font-size: 1.2em;
}

.f .song-info .artist,
.f .song-info .album {
  height: 25%;
  color: #ccc;
}

.f .loading {
  font-size: 24px;
  height: 100%;
  margin: 0 auto;
}

/* Minimal Theme */
.m.track-info {
  color: #fff;
  width: 350px;
  height: 25px;
  margin: 0 auto;
  background: #191414;
  border: 1px solid #444;
  padding: 5px;
}

.m .wrapper {
  height: 100%;
}

.m .cover {
 float: left;
 width: 10%;
 height: 100%;
}

.m .cover img {
  height: 100%;
  float: left;
}

.m .song-info {
  float: right;
  width: 90%;
  height: 100%;
}

.m .song-info div {
  text-align: left;
}

.m .song-info .name {
  font-weight: normal;
  font-size: 1.0em;
}

.m .loading {
  font-size: 14px;
  height: 100%;
  margin: 0 auto;
}
</style>
